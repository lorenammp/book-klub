import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClubsEntity } from "./clubs.entity";
import { UsersEntity } from "./users.entity";

@Entity("user_club")
export class UsersClubsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.id, {
    eager: true,
  })
  user: ClubsEntity;

  @ManyToOne(() => ClubsEntity, (ClubsEntity) => ClubsEntity.club_id, {
    eager: true,
  })
  club: ClubsEntity;
}
