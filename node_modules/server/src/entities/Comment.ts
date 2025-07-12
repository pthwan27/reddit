import { Length } from "class-validator";
import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { Exclude, Expose } from "class-transformer";
import { makeId } from "../utils/helpers";

@Entity("comments")
export class Comment extends BaseEntity {
  @Column({ unique: true })
  identifier: string;

  @Column()
  @Length(1, 255, { message: "must be at least 1 characters long" })
  body: string;

  @Column()
  username: string;

  @Column()
  postId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Post)
  post: Post;

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  protected userVote: number;

  setUserVote(user: User) {
    const idx = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = idx > -1 ? this.votes[idx].value : 0;
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
