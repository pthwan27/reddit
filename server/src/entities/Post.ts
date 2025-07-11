import { Length } from "class-validator";
import {
  Entity,
  Column,
  BaseEntity,
  Index,
  ManyToOne,
  IsNull,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Sub } from "./Sub";

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

  @Column({ nullable: true })
  @Length(1, 255, { message: "must be at least 1 characters long" })
  body: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: "subName", referencedColumnName: "name" })
  sub: Sub;
}
