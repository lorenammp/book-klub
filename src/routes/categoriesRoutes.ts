import { Router } from 'express'
import createCategoriesController from '../controllers/categories/categoriesCreate.controller'
import admMiddlleware from '../middlewares/adm.middleware'
import authMiddlewares from '../middlewares/auth.middleware'


const categoryRoutes = Router()

categoryRoutes.post('', authMiddlewares, admMiddlleware, createCategoriesController);

export default categoryRoutes 