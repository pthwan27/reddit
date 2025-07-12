import { Length } from "class-validator";
import {
  Entity,
  Column,
  BaseEntity,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from "typeorm";
import { User } from "./User";
import { Sub } from "./Sub";
import { Comment } from "./Comment";
import { Vote } from "./Vote";
import { Exclude, Expose } from "class-transformer";
import { makeId, slugify } from "../utils/helpers";

@Entity("posts")
export class Post extends BaseEntity {
  @Column({ unique: true })
  identifier: string;

  @Index()
  @Column({ unique: true })
  @Length(1, 255, { message: "must be at least 1 characters long" })
  title: string;

  @Column()
  slug: string;

  @Column({ type: "text", nullable: true })
  @Length(1, 255, { message: "must be at least 1 characters long" })
  body: string;

  @Column()
  subName: string;

  @Column()
  username: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;

  @Exclude()
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  protected userVote: number;

  setUserVote(user: User) {
    const idx = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = idx > -1 ? this.votes[idx].value : 0;
  }

  @Expose()
  get url(): string {
    return `/r/${this.subName}/${this.identifier}/${this.slug}`;
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
    this.slug = slugify(this.title);
  }
}
