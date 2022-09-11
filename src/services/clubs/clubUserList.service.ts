import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { AppError } from "../../errors/appError";

const ClubUserListService = async (clubId: string) => {
  const clubsRepository = AppDataSource.getRepository(ClubsEntity);
  const findClub = await clubsRepository.findOne({ where: { id: clubId } });

  if (!findClub) {
    throw new AppError(404, "Club not found, enter a valid club id");
  }

  const clubFound = await clubsRepository.find({
    where: {
      id: clubId,
    },
    relations: {
      user_clubs: true,
    },
  });

  return clubFound;
};

export default ClubUserListService;
