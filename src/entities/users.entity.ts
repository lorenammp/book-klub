import { OneToOne, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100 })
  password: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
