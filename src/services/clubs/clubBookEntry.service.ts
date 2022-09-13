import AppDataSource from "../../data-source";
import { BooksEntity } from "../../entities/books.entity";
import { ClubsEntity } from "../../entities/clubs.entity";
import { ClubBookEntity } from "../../entities/club_book.entity";
import { AppError } from "../../errors/appError";

const clubBookEntryService = async (clubId: string, bookId: string) => {
  const bookRepository = AppDataSource.getRepository(BooksEntity);
  const clubRepository = AppDataSource.getRepository(ClubsEntity);
  const clubBookRepository = AppDataSource.getRepository(ClubBookEntity);

  if (!clubId) {
    throw new AppError(401, "Club Id required!");
  }
  if (!bookId) {
    throw new AppError(401, "Book Id required!");
  }

  const bookAlready = await bookRepository.findBy({ id: bookId });
  const clubAlready = await clubRepository.findBy({ id: clubId });

  if (!bookAlready) {
    throw new AppError(400, "Book not found");
  }
  if (!clubAlready) {
    throw new AppError(400, "Club not found");
  }

  const newClubBook = clubBookRepository.create({
    book: bookId,
    club: clubId,
  });

  await clubBookRepository.save(newClubBook);

  return "Book added successfully";
};

export default clubBookEntryService;
