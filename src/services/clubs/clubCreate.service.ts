import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { IClubRequest } from "../../interfaces/clubs";
import { AppError } from "../../errors/appError";
import { UsersEntity } from "../../entities/users.entity";

const createClubService = async ({
  name,
  description,
  admId,
}: IClubRequest) => {
  const clubRepository = AppDataSource.getRepository(ClubsEntity);
  const userRepository = AppDataSource.getRepository(UsersEntity);

  const clubAlreadyExists = await clubRepository.findOne({
    where: { name: name },
  });

  if (clubAlreadyExists) {
    throw new AppError(400, "Club already exists!");
  }

  const clubAdm = await userRepository.findOne({
    where: { id: admId },
  });

  if (!clubAdm) {
    throw new AppError(404, "Invalid user id");
  }

  const newClub = clubRepository.create({
    name,
    description,
    adm: clubAdm,
  });

  console.log(newClub);

  await clubRepository.save(newClub);

  return newClub;
};

export default createClubService;
