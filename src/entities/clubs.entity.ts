import { OneToOne, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("clubs")
export class ClubsEntity {
  @PrimaryGeneratedColumn()
  readonly Club_id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  author: string;

  @OneToOne(() => CategoriesEntity, (CategoriesEntity) => CategoriesEntity.id)
  category_id: CategoriesEntity;

  constructor() {
    if (!this.Club_id) {
      this.Club_id = uuid();
    }
  }
}
