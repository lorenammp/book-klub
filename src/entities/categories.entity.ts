import { OneToOne, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { BooksEntity } from "./books.entity";

@Entity("categories")
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @OneToOne(() => BooksEntity, (BooksEntity) => BooksEntity.id)
  books: BooksEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
