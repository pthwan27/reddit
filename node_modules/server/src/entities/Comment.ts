import { Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment extends BaseEntity {
  @Column({ unique: true })
  identifier: string;

  @Column()
  @Length(1, 255, { message: "must be at least 1 characters long" })
  body: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @ManyToOne(() => Post)
  @JoinColumn({ name: "postId", referencedColumnName: "id" })
  post: Post;
}
