import AppDataSource from "../../data-source";
import {ClubsEntity} from "../../entities/clubs.entity"
import {IClubRequest} from "../../interfaces/clubs"
import {AppError} from "../../errors/appError"


const createClubService = async ({name, description, admId}: IClubRequest) => {
    const clubRepostory = AppDataSource.getRepository(ClubsEntity)
    const clubAlreadyExists = await clubRepostory.findOne({
        where: {name: name }
    })

    if(clubAlreadyExists) {
        throw new AppError(400, "Club already exists!")
    }

    const newClub = clubRepostory.create({
        name, 
        description, 
        adm_id : admId
    })

    await clubRepostory.save(newClub)

    return newClub
}

export default createClubService

