import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { UsersClubsEntity } from "../../entities/user_club.entity";

const ClubUserListService = async (clubId: string) => {
  const clubsUsersRepository = AppDataSource.getRepository(UsersClubsEntity);
  const clubsRepository = AppDataSource.getRepository(ClubsEntity);

  const clubFound = await clubsRepository.find({
    where: {
      id: clubId,
    },
    relations: {
      user_clubs: true,
    },
  });

  console.log(clubFound);

  return clubFound;
};

export default ClubUserListService;
