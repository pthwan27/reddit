import { Entity, Column, ManyToOne, JoinColumn, Unique } from "typeorm";

import CoreEntity from "./CoreEntity";
import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Exclude, Expose } from "class-transformer";
@Unique(["user", "post"])
@Unique(["user", "comment"])
@Entity("votes")
export class Vote extends CoreEntity {
  @Column()
  value: number;

  @Column({ nullable: true })
  postId: number;

  @Column({ nullable: true })
  commentId: number;

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @ManyToOne(() => Post)
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;

  @Expose()
  get username(): string {
    return this.user?.username;
  }
}
