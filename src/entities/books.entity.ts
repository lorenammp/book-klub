import { OneToOne, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { CategoriesEntity } from "./categories.entity";

@Entity("books")
export class BooksEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  author: string;

  @OneToOne(() => CategoriesEntity, (CategoriesEntity) => CategoriesEntity.id)
  category_id: CategoriesEntity;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
