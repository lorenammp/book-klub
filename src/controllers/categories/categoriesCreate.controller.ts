import { Request, Response } from "express";
import createCategorieService from "../../services/categories/categoriesCreate.service";

const createCategoriesController = async (req: Request, res: Response) => {
    const { name }  = req.body;
  
    const categories = await createCategorieService({ name });
    return res.status(201).json(categories);
};

export default createCategoriesController;