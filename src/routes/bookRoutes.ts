import { Router } from 'express'
import createBooksController from '../controllers/books/createBooks.controllers';
import listBooksController from '../controllers/books/listBooks.controller';
import AuthMiddlewares from '../middlewares/auth.middleware';


const booksRoutes = Router();

booksRoutes.post('',AuthMiddlewares, createBooksController);
booksRoutes.get('',listBooksController);

export default booksRoutes;