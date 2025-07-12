import { Length } from "class-validator";
import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity("votes")
export class Vote extends BaseEntity {
  @Column()
  value: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  postId: number;

  @Column({ nullable: true })
  commentId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;
}
