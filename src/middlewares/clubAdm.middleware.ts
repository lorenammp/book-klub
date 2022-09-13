import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { ClubsEntity } from "../entities/clubs.entity";
import { AppError } from "../errors/appError";

const clubAdmMiddlleware = async ( req: Request, res: Response, next: NextFunction) => {

    const userId = req.body.id
    const { clubId } = req.params

    const clubRepository = AppDataSource.getRepository(ClubsEntity)

    const clubs = await clubRepository.find()
    const club = clubs.find((club) => {
        club.id === clubId
    })

    if (!club) {
        throw new AppError(404, "Club not found");
      }

    if(userId !== club.adm.id){
        throw new AppError(404, "You need to be the club`s adm in order to have this access")
    }

    next()
}

export default clubAdmMiddlleware