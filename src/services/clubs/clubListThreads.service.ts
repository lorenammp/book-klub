import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { ThreadEntity } from "../../entities/thread.entity";
import { AppError } from "../../errors/appError";

const ClubListThreadsService = async (clubId: string) => {
  const threadsRepository = AppDataSource.getRepository(ThreadEntity);
  const clubsRepository = AppDataSource.getRepository(ClubsEntity);

  const findClub = await clubsRepository.findOne({ where: { id: clubId } });

  if (!findClub) {
    throw new AppError(404, "Club not found");
  }

  const threadList = await threadsRepository
    .createQueryBuilder()
    .select("thread")
    .from(ThreadEntity, "thread")
    .where('thread."clubId" = :id', { id: clubId })
    .groupBy("thread.id")
    .getRawMany();

  if (threadList.length === 0) {
    throw new AppError(404, "No threads have been created in this club yet");
  }

  return threadList;
};

export default ClubListThreadsService;
