//community
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  BeforeInsert,
} from "typeorm";

import CoreEntity from "./CoreEntity";
import { User } from "./User";
import { Post } from "./Post";
import { Exclude, Expose } from "class-transformer";
import { Subscription } from "./Subscription";

@Entity("subs")
export class Sub extends CoreEntity {
  @Index()
  @Column({ unique: true })
  title: string;

  @Index()
  @Column({ unique: true })
  slug: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  iconUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @Exclude()
  @ManyToOne(() => User, (user) => user.subs)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @OneToMany(() => Subscription, (subscription) => subscription.sub)
  subscribers: Subscription[];


  @Expose()
  get userId(): number {
    return this.user?.id;
  }

  @Expose()
  get username(): string {
    return this.user?.username;
  }

  @Expose()
  isSubscribed: boolean;

  @Expose()
  isOwner: boolean;

  @Expose()
  get iconUrl(): string {
    return this.iconUrn
      ? `${process.env.APP_URL}/images/subs/${this.slug}/icon/${this.iconUrn}`
      : ``;
  }

  @Expose()
  get bannerUrl(): string {
    return this.bannerUrn
      ? `${process.env.APP_URL}/images/subs/${this.slug}/banner/${this.bannerUrn}`
      : ``;
  }
  
  @Expose()
  get subscriberCount(): number {
    return this.subscribers?.length || 0;
  }

  @BeforeInsert()
  makeSlug() {
    this.slug = this.title
      .trim()
      .replace(/ /g, "-")
  }
}
