import { OneToOne, Entity, CreateDateColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

import { ClubsEntity } from "./clubs.entity";
import { BooksEntity } from "./books.entity";

@Entity("club_book")
export class ClubBookEntity {
  @ManyToOne(() => ClubsEntity, (ClubsEntity) => ClubsEntity.club_id)
  club_id: string;

  @ManyToOne(() => BooksEntity, (BooksEntity) => BooksEntity.id)
  book_id: string;

  @CreateDateColumn()
  created_At: Date;
}
