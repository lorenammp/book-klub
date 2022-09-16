import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { ThreadEntity } from "./thread.entity";
import { UsersEntity } from "./users.entity";

@Entity("post")
export class PostEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => UsersEntity, (user) => user.post, {
    eager: true,
  })
  author: UsersEntity;

  @ManyToOne(() => ThreadEntity, (thread) => thread.post, {
    eager: true,
  })
  thread: ThreadEntity;

  @Column()
  text: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
