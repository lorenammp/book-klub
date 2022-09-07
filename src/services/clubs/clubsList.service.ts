import AppDataSource from "../../data-source";
import {AppError} from "../../errors/appError";
import {ClubsEntity} from "../../entities/clubs.entity";

const clubsListService = async () => {
    const clubsRepository = AppDataSource.getRepository(ClubsEntity)

    const clubs = await clubsRepository.find()

    if (!clubs){
        throw new AppError(404, "Clubs not found")
    }

    return clubs
}

export default clubsListService