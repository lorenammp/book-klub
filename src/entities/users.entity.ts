import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { ClubsEntity } from "./clubs.entity";
import { UsersClubsEntity } from "./user_club.entity";
import { Exclude } from "class-transformer";
import { ThreadEntity } from "./thread.entity";
import { PostEntity } from "./post.entity";

@Entity("users")
export class UsersEntity {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 101 })
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => UsersClubsEntity,
    (UsersClubsEntity) => UsersClubsEntity.club
  )
  user_clubs: UsersClubsEntity[];

  @OneToMany((type) => ClubsEntity, (clubs) => clubs.adm)
  clubs: ClubsEntity[];

  @OneToMany((type) => ThreadEntity, (thread) => thread.author)
  thread: ThreadEntity[];

  @OneToMany((type) => PostEntity, (post) => post.author)
  post: PostEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
