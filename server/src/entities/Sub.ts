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

export type SubVisibility = 'public' | 'restricted' | 'private';
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

  @Column({
    type: "enum",
    enum: ["public", "restricted", "private"],
    default: "public",
  })
  visibility: SubVisibility;

  @Column({
    type: "simple-array",
    nullable: true,
  })
  tags: string[];

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
  get postCount(): number {
    return this.posts?.length || 0;
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

  
  @BeforeInsert()
  validateTags() {
    if (this.tags && this.tags.length > 3) {
      throw new Error("최대 3개의 태그만 허용됩니다.");
    }
  }
}
