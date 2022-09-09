import AppDataSource from "../../data-source"
import { UsersEntity } from "../../entities/users.entity"
import { UsersClubsEntity } from "../../entities/user_club.entity"
import { AppError } from "../../errors/appError"


const listUserClubsService = async (id: string) => {

    const userRepository = AppDataSource.getRepository(UsersEntity)

    const user = await userRepository.find({
        where: { 
            id
        }, 
        relations: {
            user_clubs: true
        }
    })

    if(!user){
        throw new AppError(404, "User does not exists")
    }

    return user
}

export default listUserClubsService