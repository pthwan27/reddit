import { Length } from "class-validator";
import { Entity, Column, BaseEntity, Index, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Post extends BaseEntity {
  @Index()
  @Column({ unique: true })
  @Length(1, 255, { message: "must be at least 1 characters long" })
  title: string;

  @Column()
  @Length(1, 255, { message: "must be at least 1 characters long" })
  body: string;

  @Column()
  @Length(1, 255, { message: "must be at least 1 characters long" })
  username: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
