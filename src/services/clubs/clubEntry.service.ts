import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { UsersEntity } from "../../entities/users.entity";
import { UsersClubsEntity } from "../../entities/user_club.entity";
import { AppError } from "../../errors/appError";

const ClubEntryService = async (userId: string, clubId: string) => {
  const userRepository = AppDataSource.getRepository(UsersEntity);
  const users = await userRepository.find();
  const clubUser = users.find((user) => user.id === userId);

  if (!clubUser) {
    throw new AppError(404, "User not found");
  }

  const clubRepository = AppDataSource.getRepository(ClubsEntity);
  const clubs = await clubRepository.find();
  const enteredClub = clubs.find((club) => club.id === clubId);

  if (!enteredClub) {
    throw new AppError(404, "Club not found");
  }

  const usersClubsRepository = AppDataSource.getRepository(UsersClubsEntity);
  const usersInClub = await usersClubsRepository.find();
  const userExistsInClub = usersInClub.find(
    (usersClubs) =>
      usersClubs.user.id === userId && usersClubs.club.id === clubId
  );

  if (userExistsInClub) {
    throw new AppError(400, "User already belongs to this club");
  }
  const newClubUser = usersClubsRepository.create({
    user: clubUser,
    club: enteredClub,
  });

  await usersClubsRepository.save(newClubUser);

  return "User entered in club!";
};

export default ClubEntryService;
