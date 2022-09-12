import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { UsersEntity } from "../../entities/users.entity";
import { UsersClubsEntity } from "../../entities/user_club.entity";
import { AppError } from "../../errors/appError";

const ClubUserListService = async (clubId: string) => {
  const clubsRepository = AppDataSource.getRepository(ClubsEntity);
  const findClub = await clubsRepository.findOne({ where: { id: clubId } });

  if (!findClub) {
    throw new AppError(404, "Club not found, enter a valid club id");
  }

  const clubUsers = await clubsRepository
    .createQueryBuilder()
    .select("users")
    .from(UsersClubsEntity, "usc")
    .innerJoin(UsersEntity, "users", 'users."id" = usc."userId"')
    .where('usc."clubId" = :id', { id: clubId })
    .groupBy("users.id")
    .getRawMany();

  return clubUsers;
};

export default ClubUserListService;
