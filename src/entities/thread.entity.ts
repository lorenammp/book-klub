import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { ClubsEntity } from "./clubs.entity";
import { PostEntity } from "./post.entity";
import { UsersEntity } from "./users.entity";

@Entity("thread")
export class ThreadEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => ClubsEntity, (club) => club.thread, {
    eager: true,
  })
  club: ClubsEntity;

  @ManyToOne(() => UsersEntity, (user) => user.thread, {
    eager: true,
  })
  author: UsersEntity;

  @Column({ length: 100 })
  title: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => PostEntity, (post) => post.thread)
  post: PostEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
