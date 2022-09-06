import {
  OneToOne,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { UsersEntity } from "./users.entity";

@Entity("clubs")
export class ClubsEntity {
  @PrimaryGeneratedColumn()
  readonly Club_id: string;

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

  constructor() {
    if (!this.Club_id) {
      this.Club_id = uuid();
    }
  }
}
