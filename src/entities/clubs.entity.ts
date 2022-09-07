import {
  OneToOne,
  OneToMany,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { SessionsEntity } from "./sessions.entity";
import { UsersEntity } from "./users.entity";

@Entity("clubs")
export class ClubsEntity {
  @PrimaryColumn("uuid")
  readonly club_id: string;

  @OneToOne(() => UsersEntity, (UsersEntity) => UsersEntity.id)
  adm_id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  created_At: Date;

  @OneToMany(
    () => SessionsEntity,
    (SessionsEntity) => SessionsEntity.session_id
  )
  user_clubs: SessionsEntity;

  constructor() {
    if (!this.club_id) {
      this.club_id = uuid();
    }
  }
}
