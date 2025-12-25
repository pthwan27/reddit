import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/Post';
import { User } from '../../entities/User';

export const HighlightListHandler: RequestHandler = async (req, res) => {
  const user: User | undefined = res.locals.user;

  try {
    const queryBuilder = AppDataSource.getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.sub', 'sub')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.votes', 'votes')
      .leftJoinAndSelect('votes.user', 'voteUser')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')
      .where(
        '(post."postType" = :link) OR ' +
          '(post."postType" = :media AND post."mediaType" = :image)',
        { link: 'link', media: 'media', image: 'image' }
      );

    queryBuilder.addSelect(
      (subquery) =>
        subquery
          .select('COALESCE(SUM(votes.value), 0)')
          .from('votes', 'votes')
          .where('votes.postId = post.id'),
      'sort_by_votes'
    );

    queryBuilder.addSelect(
      (subQuery) =>
        subQuery
          .select('COUNT(comments.id)')
          .from('comments', 'comments')
          .where('comments.postId = post.id'),
      'sort_by_comments'
    );

    queryBuilder
      .orderBy('sort_by_votes', 'DESC')
      .addOrderBy('sort_by_comments', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')
      .limit(10);

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
