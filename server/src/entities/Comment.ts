import { Length } from "class-validator";
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";

import CoreEntity from "./CoreEntity";
import { User } from "./User";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { Exclude, Expose } from "class-transformer";
import { makeId } from "../utils/helpers";

@Entity("comments")
export class Comment extends CoreEntity {
  @Column({ unique: true })
  identifier: string;

  @Column()
  @Length(1, 255, { message: "must be at least 1 characters long" })
  body: string;

  @Column()
  postId: number;

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  @ManyToOne(() => Comment, (comment) => comment.childComments, { nullable: true, onDelete: 'CASCADE' })
  parentComment: Comment;

  @Expose()
  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComments: Comment[];


  @Expose()
  get username(): string {
    return this.user?.username;
  }
  
  @Expose()
  get userProfileUrl(): string {
    return this.user?.profileUrl;
  }

  protected userVote: number;

  setUserVote(user: User) {
    const idx = this.votes?.findIndex((v) => v.user.id === user.id);
    this.userVote = idx > -1 ? this.votes[idx].value : 0;
  }

  @Expose()
  get commentCount(): number {
    return this.childComments?.length;
  }

  @Expose()
  get voteScore(): number {
    return this.votes?.reduce((v, cur) => v + (cur.value || 0), 0);
  }

  @BeforeInsert()
  makeId() {
    this.identifier = makeId(8);
  }
}
