import AppDataSource from "../../data-source";
import { UsersEntity } from "../../entities/users.entity";
import { UsersClubsEntity } from "../../entities/user_club.entity";
import { AppError } from "../../errors/appError";

const listUserClubsService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(UsersEntity);
  const usersClubs = AppDataSource.getRepository(UsersClubsEntity);
  const findUser = userRepository.findOne({ where: { id: id } });

  if (!findUser) {
    throw new AppError(404, "not found");
  }
  const user = await usersClubs.find();
  const userClub = user.filter((user_club) => user_club.user.id === id);

  return userClub;
};

export default listUserClubsService;
