import { Length } from "class-validator";
import { Entity, Column, BaseEntity, Index, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("votes")
export class Vote extends BaseEntity {
  @Column()
  value: string;

  @Column()
  @Length(1, 255, { message: "must be at least 1 characters long" })
  username: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
