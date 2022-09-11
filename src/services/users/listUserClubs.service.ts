import AppDataSource from "../../data-source";
import { UsersEntity } from "../../entities/users.entity";
import { ClubsEntity } from "../../entities/clubs.entity";
import { UsersClubsEntity } from "../../entities/user_club.entity";
import { AppError } from "../../errors/appError";

const listUserClubsService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(UsersEntity);
  const ClubRepository = AppDataSource.getRepository(ClubsEntity);
  const findUser = userRepository.findOne({ where: { id: id } });

  if (!findUser) {
    throw new AppError(404, "not found");
  }
  
  const userClub = await ClubRepository.createQueryBuilder()
        .select("c")
        .from(UsersClubsEntity, "usc")
        .innerJoin(ClubsEntity, "c", 'c."id" = usc."clubId"')
        .where('usc."userId" = :id', {id: id})
        .groupBy("c.id")
        .getRawMany()

  return userClub;
};

export default listUserClubsService;
