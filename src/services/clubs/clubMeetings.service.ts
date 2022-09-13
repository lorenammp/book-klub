import AppDataSource from "../../data-source";
import { MeetingsEntity } from "../../entities/meetings.entity";
import { ClubsEntity } from "../../entities/clubs.entity";
import { AppError } from "../../errors/appError";

const clubMeetingsService = async (
  clubId: string,
  date: string,
  hour: string,
  description: string
) => {
  const meetingsRepository = AppDataSource.getRepository(MeetingsEntity);
  const clubRepository = AppDataSource.getRepository(ClubsEntity);

  if (!date || !hour || !description) {
    throw new AppError(
      401,
      "Missing properties, date, hour and description must be sent."
    );
  }

  const clubFind = await clubRepository.find();
  const clubIdd = clubFind.find((club) => club.id === clubId);

  if (!clubIdd) {
    throw new AppError(400, "Club not found");
  }

  const newMeeting = meetingsRepository.create({
    club: clubIdd,
    date,
    hour,
    description,
  });

  await meetingsRepository.save(newMeeting);

  return newMeeting;
};

export default clubMeetingsService;
