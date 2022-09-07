import { Router } from 'express'
import listBooksController from '../controllers/books/listBooks.controller';


const booksRoutes = Router();

booksRoutes.get('',listBooksController);

export default booksRoutes;