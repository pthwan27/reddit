import { Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import CoreEntity from "./CoreEntity";
import { User } from "./User";
import { Sub } from "./Sub";

@Entity("subscriptions")
@Unique(['user', 'sub'])
export class Subscription extends CoreEntity {

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.subscribers)
  @JoinColumn({ name: 'subId', referencedColumnName: 'id' })
  sub: Sub;
}