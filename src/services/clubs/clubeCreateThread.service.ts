import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { ThreadEntity } from "../../entities/thread.entity";
import { UsersEntity } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IThreadRequest } from "../../interfaces/clubs";

const ClubCreateThreadService = async ({
  clubId,
  authorId,
  title,
  text,
}: IThreadRequest) => {
  const clubsRepository = AppDataSource.getRepository(ClubsEntity);
  const userRepository = AppDataSource.getRepository(UsersEntity);
  const threadRepository = AppDataSource.getRepository(ThreadEntity);

  if (!authorId || !title || !text) {
    throw new AppError(
      401,
      "Missing parameter, thread must have author id, title and text"
    );
  }

  const getClub = await clubsRepository.findOne({ where: { id: clubId } });

  if (!getClub) {
    throw new AppError(404, "Club not found");
  }

  const getAuthor = await userRepository.findOne({ where: { id: authorId } });

  if (!getAuthor) {
    throw new AppError(404, "User not found");
  }

  const newThread = threadRepository.create({
    club: getClub,
    author: getAuthor,
    title,
    text,
  });

  await threadRepository.save(newThread);

  return newThread;
};

export default ClubCreateThreadService;
