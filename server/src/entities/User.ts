import { Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import {
  Entity,
  Column,
  BaseEntity,
  Index,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { Sub } from "./Sub";
import { Comment } from "./Comment";

@Entity("users")
export class User extends BaseEntity {
  @Index()
  @Column({ unique: true })
  @IsEmail(undefined, { message: "must be a valid email address" })
  @Length(1, 255, { message: "must be at least 1 characters long" })
  email: string;

  @Index()
  @Column({ unique: true })
  @Length(3, 255, { message: "must be at least 3 characters long" })
  username: string;

  @Exclude()
  @Column()
  @Length(6, 20, { message: "must be at least 6 characters long" })
  password: string;

  @OneToMany(() => Sub, (sub) => sub.user)
  subs: Sub[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => Comment, (comment) => comment.user)
  Comments: Comment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
