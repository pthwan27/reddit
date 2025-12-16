import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/Post';
import { Sub } from '../../entities/Sub';
import { User } from '../../entities/User';

export const ListBySubHandler: RequestHandler = async (req, res) => {
  const user: User | undefined = res.locals.user;
  const { id } = req.params;
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  const sortOption = req.query.sortOption;

  try {
    const sub = await Sub.findOneBy({ id: parseInt(id, 10) });

    if (!sub) {
      return res.status(404).json({ error: '커뮤니티를 찾을 수 없습니다.' });
    }

    const queryBuilder = AppDataSource.getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.sub', 'sub')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.votes', 'votes')
      .leftJoinAndSelect('votes.user', 'voteUser')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')
      .where('sub.id = :subId', { subId: parseInt(id, 10) });

    switch (sortOption) {
      case '인기순':
        queryBuilder
          .addSelect(
            (subquery) =>
              subquery
                .select('COALESCE(SUM(votes.value), 0)')
                .from('votes', 'votes')
                .where('votes.postId = post.id'),
            'sort_by_votes'
          )
          .addOrderBy('sort_by_votes', 'DESC');

        break;
      case '댓글 많은 순':
        queryBuilder
          .addSelect(
            (subQuery) =>
              subQuery
                .select('COUNT(c.id)')
                .from('comments', 'c')
                .where('c.postId = post.id'),
            'sort_by_comments'
          )
          .addOrderBy('sort_by_comments', 'DESC');
        break;

      case '최신순':
      default:
        queryBuilder.orderBy('post.createdAt', 'DESC');
        break;
    }

    queryBuilder.skip(page * limit).take(limit);

    const [posts] = await queryBuilder.getManyAndCount();

    if (user) {
      posts.forEach((p: Post) => p.setUserVote(user));
    }

    return res.status(200).json({ posts: instanceToPlain(posts) });
  } catch (error) {
    console.error('Error fetching post list:', error);
    return res.status(500).json({ error: 'Failed to Get post list' });
  }
};
