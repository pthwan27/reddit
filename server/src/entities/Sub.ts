import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { Expose } from "class-transformer";

@Entity()
export class Sub extends BaseEntity {
  @Index()
  @Column()
  name: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @Expose()
  get imageUrl(): string {
    return this.imageUrl
      ? `${process.env.APP_URL}/images/${this.imageUrl}`
      : "https://avatar.iran.liara.run/public";
  }

  @Expose()
  get bannerUrl(): string {
    return this.bannerUrl
      ? `${process.env.APP_URL}/images/${this.bannerUrl}`
      : "";
  }
}
