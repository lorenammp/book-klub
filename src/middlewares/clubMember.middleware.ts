import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { ClubsEntity } from "../entities/clubs.entity";
import { UsersEntity } from "../entities/users.entity";
import { UsersClubsEntity } from "../entities/user_club.entity";

const ClubMemberMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clubId = req.params.id;
  const userId = req.body.id;

  const clubsRepository = AppDataSource.getRepository(ClubsEntity);
  const getClub = await clubsRepository.findOne({
    where: { id: clubId },
  });

  if (!getClub) {
    return res.status(404).send({
      staus: "error",
      statusCode: 404,
      message: "Club not found",
    });
  }

  const clubUsers = await clubsRepository
    .createQueryBuilder()
    .select([
      "users.id",
      "users.name",
      "users.email",
      "users.isAdm",
      "users.isActive",
    ])
    .from(UsersClubsEntity, "usc")
    .innerJoin(UsersEntity, "users", 'users."id" = usc."userId"')
    .where('usc."clubId" = :id', { id: clubId })
    .groupBy("users.id")
    .getRawMany();

  const getUser = clubUsers.find((user) => user.users_id === userId);

  if (!getUser) {
    return res.status(403).send({
      staus: "error",
      statusCode: 403,
      message:
        "User is not a member of this club, only members can create threads",
    });
  }

  next();
};

export default ClubMemberMiddleware;
