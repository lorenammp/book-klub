import { Entity, ManyToOne } from "typeorm";
import { ClubsEntity } from "./clubs.entity";
import { UsersEntity } from "./users.entity";

@Entity("user_club")
export class UsersClubsEntity {
  @ManyToOne(() => UsersEntity, (UsersEntity) => UsersEntity.id, {
    eager: true,
  })
  user_id: ClubsEntity;

  @ManyToOne(() => ClubsEntity, (ClubsEntity) => ClubsEntity.club_id, {
    eager: true,
  })
  club_id: ClubsEntity;
}
