import { OneToOne, Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { ClubsEntity } from "./clubs.entity";
import { BooksEntity } from "./books.entity";

@Entity("club_book")
export class ClubBookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ClubsEntity, (ClubsEntity) => ClubsEntity.club_id)
  club: string;

  @ManyToOne(() => BooksEntity, (BooksEntity) => BooksEntity.id)
  book: string;

  @CreateDateColumn()
  created_At: Date;
}
