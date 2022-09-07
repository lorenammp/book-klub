import {
  OneToOne,
  Entity,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { ClubsEntity } from "./clubs.entity";
import { BooksEntity } from "./books.entity";

@Entity("club_book")
export class ClubBookEntity {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne(() => ClubsEntity, (ClubsEntity) => ClubsEntity.club_id)
  club: string;

  @ManyToOne(() => BooksEntity, (BooksEntity) => BooksEntity.id)
  book: string;

  @CreateDateColumn()
  created_At: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
