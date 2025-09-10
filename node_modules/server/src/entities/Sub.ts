//community

import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from "typeorm";

import CoreEntity from "./CoreEntity";
import { User } from "./User";
import { Post } from "./Post";
import { Exclude, Expose } from "class-transformer";

@Entity("subs")
export class Sub extends CoreEntity {
  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @Exclude()
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @Expose()
  get username(): string {
    return this.user?.username;
  }

  @Expose()
  get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP_URL}/images/${this.imageUrn}`
      : "https://avatar.iran.liara.run/public";
  }

  @Expose()
  get bannerUrl(): string {
    return this.bannerUrn
      ? `${process.env.APP_URL}/images/${this.bannerUrn}`
      : "";
  }
}
