import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { ClubsEntity } from "./clubs.entity";

@Entity("sessions")
export class SessionsEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly session_id: string;

  @OneToMany(() => ClubsEntity, (ClubsEntity) => ClubsEntity.club_id)
  club_id: ClubsEntity;

  @Column({ type: "date" })
  date: Date;

  @Column("time")
  hour: string;

  constructor() {
    if (!this.session_id) {
      this.session_id = uuid();
    }
  }
}
