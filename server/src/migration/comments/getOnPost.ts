import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { AppDataSource } from '../../data-source';
import { Comment } from '../../entities/Comment';
import { Post } from '../../entities/Post';
import { User } from '../../entities/User';

export const GetCommentsOnPostHandler: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    const sortOption = req.query.sortOption;

    const user: User | undefined = res.locals.user;

    const post = await Post.findOneBy({
      id: parseInt(id, 10),
    });

    if (!post) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }
    if (user) {
      post.setUserVote(user);
    }

    const rootQueryBuilder = AppDataSource.getRepository(Comment)
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.votes', 'vote')
      .leftJoinAndSelect('vote.user', 'voteUser')
      .where('comment.postId = :postId', { postId: id })
      .andWhere('comment.parentCommentId IS NULL');

    switch (sortOption) {
      case '인기순':
        rootQueryBuilder
          .addSelect(
            (subquery) =>
              subquery
                .select('COALESCE(SUM(votes.value), 0)')
                .from('votes', 'votes')
                .where('votes.commentId = comment.id'),
            'sort_by_votes'
          )
          .addOrderBy('sort_by_votes', 'DESC');
        break;
      case '댓글 많은 순':
        rootQueryBuilder
          .addSelect(
            (subQuery) =>
              subQuery
                .select('COUNT(comments.id)')
                .from('comments', 'comments')
                .where('comments.parentCommentId = comment.id'),
            'sort_by_comments'
          )
          .addOrderBy('sort_by_comments', 'DESC');
        break;
      case '최신순':
      default:
        rootQueryBuilder.orderBy('comment.createdAt', 'DESC');
        break;
    }

    rootQueryBuilder.skip(page * limit).take(limit);

    const [rootComments] = await rootQueryBuilder.getManyAndCount();
    const rootCommentIds = rootComments.map((comment) => comment.id);

    if (rootCommentIds.length === 0) {
      return res.status(200).json({
        comments: [],
      });
    }

    const childCommentsRecursionQuery = `
      WITH RECURSIVE comment_tree AS (
        -- 초기 쿼리: 선택된 루트 댓글들의 직접 자식
        SELECT c.id, c."createdAt", c."updatedAt", c.body, c."userId", c."postId", c."parentCommentId", c.identifier
        FROM comments c
        WHERE c."parentCommentId" IN (${rootCommentIds.join(',')})
        
        UNION ALL
        
        -- 재귀 쿼리: 이전 단계에서 찾은 댓글들의 자식들
        SELECT c.id, c."createdAt", c."updatedAt", c.body, c."userId", c."postId", c."parentCommentId", c.identifier
        FROM comments c
        INNER JOIN comment_tree ct ON c."parentCommentId" = ct.id
      )
      SELECT DISTINCT id FROM comment_tree;
    `;

    const childCommentRows = await AppDataSource.query(
      childCommentsRecursionQuery
    );
    const childCommentIds = childCommentRows.map((row: any) => row.id);

    let allComments = [...rootComments];

    if (childCommentIds.length > 0) {
      const childCommentsQuery = await AppDataSource.getRepository(Comment)
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .leftJoinAndSelect('comment.votes', 'vote')
        .leftJoinAndSelect('vote.user', 'voteUser')
        .where('comment.id IN (:...childCommentIds)', {
          childCommentIds,
        })
        .getMany();

      allComments = [...rootComments, ...childCommentsQuery];
    }

    if (user) {
      allComments.forEach((comment: Comment) => comment.setUserVote(user));
    }

    const buildCommentTree = (comments: Comment[]) => {
      const commentMap = new Map<number, any>();

      const rootComments = [];

      comments.forEach((comment: Comment) => {
        const instanceToPlainComment = instanceToPlain(comment);

        commentMap.set(comment.id, {
          ...instanceToPlainComment,
          childComments: [],
        });
      });

      comments.forEach((comment: Comment) => {
        const currentComment = commentMap.get(comment.id);

        if (comment.parentCommentId) {
          const parentComment = commentMap.get(comment.parentCommentId);

          if (parentComment && currentComment) {
            parentComment.childComments.push(currentComment);
          }
        } else {
          if (currentComment) {
            rootComments.push(currentComment);
          }
        }
      });

      return rootComments;
    };
    const commentTree = buildCommentTree(allComments);

    return res.status(200).json({
      comments: commentTree,
    });
  } catch (error) {
    console.error('Error getting comment list:', error);

    res.status(500).json({ error: 'Failed to get comment list' });
    return;
  }
};
