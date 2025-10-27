import { Exclude, Expose } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import { Column, Index, BeforeInsert, OneToMany, Entity, OneToOne } from "typeorm";
import bcrypt from "bcryptjs";

import CoreEntity from "./CoreEntity";
import { Post } from "./Post";
import { Vote } from "./Vote";
import { Sub } from "./Sub";
import { Comment } from "./Comment";
import { nanoid } from "nanoid";

@Entity("users")
export class User extends CoreEntity {
  @Index()
  @Column({ unique: true })
  uuid: string;

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


  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => Sub, (sub) => sub.user)
  subs: Sub[]; 

  @OneToOne(() => Sub, (sub) => sub.profileUser, { cascade: true })
  profileSub: Sub;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  @BeforeInsert()
  generateUuid() {
    this.uuid = nanoid();
  }
  
  @Expose()
  get profileUrl(): string {
    if (this.profileSub && this.profileSub.iconUrl) {
      return this.profileSub.iconUrl;
    }
    return `${process.env.APP_URL}/images/default_profile.png`;
  }  
}
