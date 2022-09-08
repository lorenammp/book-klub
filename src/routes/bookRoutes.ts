import { Router } from 'express'
import createBooksController from '../controllers/books/createBooks.controllers';
import listBooksController from '../controllers/books/listBooks.controller';


const booksRoutes = Router();

booksRoutes.post('',createBooksController);
booksRoutes.get('',listBooksController);

export default booksRoutes;