import AppDataSource from "../../data-source";
import { UsersEntity } from "../../entities/users.entity";

const listCategoriesService = async():Promise<UsersEntity[]> => {

    const CategoryRepository = AppDataSource.getRepository(UsersEntity);
    const categoryList = await CategoryRepository.find();
    
    return categoryList;
};
export default listCategoriesService;