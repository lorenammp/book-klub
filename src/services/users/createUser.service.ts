import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { IUser, IUserRequest } from "../../interfaces/users";

import { hash } from "bcrypt"
import { UsersEntity } from "../../entities/users.entity";

async function createUserService(userData: IUserRequest): Promise<IUser>{

    const userRepository = AppDataSource.getRepository(UsersEntity)

    const emailAlreadyExists = await userRepository.findOneBy({email: userData.email})

    if(emailAlreadyExists){
        throw new AppError(400, "Email already in use")
    }

    const hashedPassword = await hash(userData.password,10)

    const newUser = await userRepository.save({
        ...userData,
        password: hashedPassword
    })

    const { password, ...user } = newUser

    return user

}

export default createUserService