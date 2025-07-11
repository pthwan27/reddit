import { Length } from "class-validator";
import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  IntegerType,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("votes")
export class Vote extends BaseEntity {
  @Column()
  value: IntegerType;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;
}
