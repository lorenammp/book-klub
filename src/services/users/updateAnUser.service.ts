import AppDataSource from "../../data-source";
import { UsersEntity } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcryptjs";

const UpdateAnUsersService = async (userId: string, dataUser: IUserRequest) => {
  const UserRepository = AppDataSource.getRepository(UsersEntity);
  const UserFind = await UserRepository.findOneBy({ id: userId });
  const Users = await UserRepository.find();

  const EmailAlreadyExists = Users.find(
    (user) => user.email === dataUser.email
  );

  if (!UserFind) {
    throw new AppError(404, "User not found");
  }

  if (EmailAlreadyExists) {
    throw new AppError(403, "This email is already being used");
  }

  await UserRepository.update(userId, {
    email: dataUser.email ? dataUser.email : UserFind.email,
    name: dataUser.name ? dataUser.name : UserFind.name,
    password: dataUser.password
      ? await hash(dataUser.password, 10)
      : UserFind.password,
  });

  const user = await UserRepository.findOneBy({ id: userId });

  return user!;
};
export default UpdateAnUsersService;
