import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/Post';
import { Subscription } from '../../entities/Subscription';
import { User } from '../../entities/User';

export const ListHandler: RequestHandler = async (req, res) => {
  const user: User | undefined = res.locals.user;
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  const sortOption = req.query.sortOption;

  try {
    const queryBuilder = AppDataSource.getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.sub', 'sub')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.votes', 'votes')
      .leftJoinAndSelect('votes.user', 'voteUser')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')

      .skip(page * limit)
      .take(limit);

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

    const [posts] = await queryBuilder.getManyAndCount();

    if (user) {
      posts.forEach((p: Post) => p.setUserVote(user));

      const subscriptions = await Subscription.find({
        where: { user: { id: user.id } },
        relations: ['sub', 'sub.subscribers'],
      });

      const subscriptionSubIds = subscriptions.map((s) => s.sub.id);

      posts.forEach((p: Post) => {
        if (subscriptionSubIds.includes(p.sub.id)) {
          p.sub.isSubscribed = true;
        }
      });
    }

    return res.status(200).json({ posts: instanceToPlain(posts) });
  } catch (error) {
    console.error('Error fetching post list:', error);
    return res.status(500).json({ error: 'Failed to Get post list' });
  }
};
