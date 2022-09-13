import AppDataSource from "../../data-source";
import { BooksEntity } from "../../entities/books.entity";
import { ClubsEntity } from "../../entities/clubs.entity";
import { ClubBookEntity } from "../../entities/club_book.entity";
import { AppError } from "../../errors/appError";

const clubBookEntryService = async (clubId: string, bookId: string) => {
  const bookRepository = AppDataSource.getRepository(BooksEntity);
  const clubRepository = AppDataSource.getRepository(ClubsEntity);
  const clubBookRepository = AppDataSource.getRepository(ClubBookEntity);

  const bookAlready = await bookRepository.findOneBy({ id: bookId });
  const clubAlready = await clubRepository.findOneBy({ id: clubId });

  if (!bookAlready) {
    throw new AppError(404, "Book not found");
  }
  if (!clubAlready) {
    throw new AppError(404, "Club not found");
  }

  const newClubBook = clubBookRepository.create({
    book: bookId,
    club: clubId,
  });

  await clubBookRepository.save(newClubBook);

  return "Book added successfully";
};

export default clubBookEntryService;
