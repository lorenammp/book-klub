import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";

const ClubUserListService = async (clubId: string) => {
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
