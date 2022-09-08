import { Request, Response } from "express";
import createBooksService from "../../services/books/createBooks.service";

const createBooksController = async (req: Request, res: Response)=>{
    const data = req.body;

    const book = createBooksService(data)

    return res.status(201).json(book)

}

export default createBooksController;
