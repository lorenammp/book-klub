import AppDataSource from "../../data-source";
import { BooksEntity } from "../../entities/books.entity";
import { ClubsEntity } from "../../entities/clubs.entity";
import { ClubBookEntity } from "../../entities/club_book.entity";
import { AppError } from "../../errors/appError";
import {v4 as uuidv4} from "uuid";

const clubBookEntryService = async(clubId: string, bookId: string)=>{
    const bookRepository = AppDataSource.getRepository(BooksEntity);
    const clubRepository = AppDataSource.getRepository(ClubsEntity);
    const clubBookRepository = AppDataSource.getRepository(ClubBookEntity);

    const bookAlready = await bookRepository.findBy({id: bookId});
    const clubAlready = await clubRepository.findBy({id: clubId})

    if(!bookAlready){
        new AppError(400, "Book not found")
    }
    if(!clubAlready){
        new AppError(400, "Club not found")
    }

    const newClubBook = clubBookRepository.create({
        id: uuidv4(),
        book: bookId,
        club: clubId
    })

    await clubBookRepository.save(newClubBook)

    return "Book added successfully"
}

export default clubBookEntryService;