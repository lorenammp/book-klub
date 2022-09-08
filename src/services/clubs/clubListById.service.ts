import AppDataSource from "../../data-source";
import { ClubsEntity } from "../../entities/clubs.entity";
import { AppError } from "../../errors/appError";

const clubListByIdService = async  (id: string) => {
    const clubRepository = AppDataSource.getRepository(ClubsEntity)

    const club = await clubRepository.findOne({ 
        where: { id: id}
    })

    if (!club){
        throw new AppError(404, "Club not found!")
    }

    return club
}

export default clubListByIdService