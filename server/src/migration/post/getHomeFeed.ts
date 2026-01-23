import { instanceToPlain } from 'class-transformer';
import { RequestHandler } from 'express';

import { AppDataSource } from '../../data-source';
import { Post } from '../../entities/Post';
import { Subscription } from '../../entities/Subscription';
import { User } from '../../entities/User';

export const GetHomeFeedHandler: RequestHandler = async (req, res) => {
  const user: User | undefined = res.locals.user;
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;

  const sortOption = req.query.sortOption;

  try {
    let subscribedSubIds: number[] = [];

    const queryBuilder = AppDataSource.getRepository(Post)
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.sub', 'sub')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.votes', 'votes')
      .leftJoinAndSelect('votes.user', 'voteUser')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser');

    if (user) {
      const subscriptions = await Subscription.find({
        where: { user: { id: user.id } },
        relations: ['sub'],
      });
      subscribedSubIds = subscriptions.map((s) => s.sub.id);

      if (subscribedSubIds.length > 0) {
        queryBuilder.where(
          '(post.subId IN (:...subscribedSubIds) OR sub.visibility = :public)',
          {
            subscribedSubIds,
            public: 'public',
          }
        );

        queryBuilder.addSelect(
          `CASE WHEN post.subId IN (:...subscribedSubIds) THEN 1 ELSE 0 END`,
          'is_subscribed'
        );
      } else {
        queryBuilder.where('sub.visibility = :public', { public: 'public' });
      }
    } else {
      queryBuilder.where('sub.visibility = :public', { public: 'public' });
    }

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

    switch (sortOption) {
      case '인기순':
        queryBuilder
          .orderBy('sort_by_votes', 'DESC')
          .addOrderBy('post.createdAt', 'DESC');
        break;
      case '댓글 많은 순':
        queryBuilder
          .orderBy('sort_by_comments', 'DESC')
          .addOrderBy('post.createdAt', 'DESC');
        break;

      case '최신순':
      default:
        if (user && subscribedSubIds?.length > 0) {
          queryBuilder
            .orderBy('is_subscribed', 'DESC')
            .addOrderBy('post.createdAt', 'DESC');
        } else {
          queryBuilder.orderBy('post.createdAt', 'DESC');
        }
        break;
    }

    queryBuilder.skip(page * limit).take(limit);

    const [posts] = await queryBuilder.getManyAndCount();

    if (user) {
      posts.forEach((p: Post) => p.setUserVote(user));

      const subscriptions = await Subscription.find({
        where: { user: { id: user.id } },
        relations: ['sub', 'sub.subscribers'],
      });

      const subscriptionSubIds = subscriptions.map((s) => s.sub.id);

      posts.forEach((p: Post) => {
        p.sub.isSubscribed = subscriptionSubIds.includes(p.sub.id);

        p.sub.isOwner = p.user.id === user.id;
      });
    }

    return res.status(200).json({ posts: instanceToPlain(posts) });
  } catch (error) {
    console.error('Error fetching post list:', error);
    return res.status(500).json({ error: 'Failed to Get post list' });
  }
};
