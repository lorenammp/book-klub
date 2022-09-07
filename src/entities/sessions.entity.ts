import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { ClubsEntity } from "./clubs.entity";

@Entity("sessions")
export class SessionsEntity {
  @PrimaryColumn("uuid")
  readonly session_id: string;

  @ManyToOne(() => ClubsEntity, (club) => club.session, {
    eager: true,
  })
  club: ClubsEntity;

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
