import {
  OneToOne,
  OneToMany,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { SessionsEntity } from "./sessions.entity";
import { UsersEntity } from "./users.entity";

@Entity("clubs")
export class ClubsEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne((type) => UsersEntity, (user) => user.clubs, {
    eager: true,
  })
  adm: UsersEntity;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_At: Date;

  @OneToMany(() => SessionsEntity, (SessionsEntity) => SessionsEntity.club)
  session: SessionsEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
