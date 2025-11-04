import { Length } from "class-validator";
import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from "typeorm";

import CoreEntity from "./CoreEntity";
import { User } from "./User";
import { Sub } from "./Sub";
import { Comment } from "./Comment";
import { Vote } from "./Vote";
import { Exclude, Expose } from "class-transformer";
import { makeId } from "../utils/helpers";

@Entity("posts")
export class Post extends CoreEntity {
  @Index()
  @Column({ unique: true })
  identifier: string;

  @Column({ unique: true })
  @Length(1, 255, { message: "must be at least 1 characters long" })
  title: string;

  @Column()
  slug: string;

  @Column({ type: "text", nullable: true })
  @Length(1, 255, { message: "must be at least 1 characters long" })
  body: string;

  @Column()
  subTitle: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subTitle", referencedColumnName: "title" })
  sub: Sub;

  @Exclude()
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];
  
  @Expose()
  protected userVote: number;

  setUserVote(user: User) {
    const idx = this.votes?.findIndex((v) => v.user.id === user.id);
    this.userVote = idx > -1 ? this.votes[idx].value : 0;
  }

  @Expose()
  get username(): string {
    return this.user?.username;
  }

  @Expose()
  get url(): string {
    return `/r/${this.subTitle}/${this.identifier}/${this.slug}`;
  }

  @Expose()
  get commentCount(): number {
    return this.comments?.length;
  }

  @Expose()
  get voteScore(): number {
    return this.votes?.reduce((v, cur) => v + (cur.value || 0), 0);
  }
  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = this.title
      .trim()
      .replace(/ /g, "-");
  }
}
