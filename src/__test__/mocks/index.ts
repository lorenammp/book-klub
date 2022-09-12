import { IUserLogin, IUserRequest } from "../../interfaces/users";

export const fakeId = "9be1d4fe-df85-4fde-bf89-19ef2d37bbb5";

export const mockedUserRegister = {
  name: "User",
  email: "user@mail.com",
  password: "123456",
};

export const mockedUserLogin: IUserLogin = {
  email: "user@mail.com",
  password: "123456",
};

export const mockedSecondUserRegister = {
  name: "New user",
  email: "newuser@mail.com",
  password: "123456",
};

export const mockedSecondUserLogin: IUserLogin = {
  email: "newuser@mail.com",
  password: "123456",
};

export const mockedClubRegister = {
  name: "Sci-fi book club",
  description: "This is a club for sci-fi literature lovers!",
};

export const mockedSecondClubRegister = {
  name: "Drada book club",
  description: "This is a club for drama literature lovers!",
};

export const mockedWrongClubRegister = {
  name: "Drama book club",
};

export const mockedCategoryRegister = {
  name: "Science fiction",
};

export const mockedSecondCategoryRegister = {
  name: "Drama",
};

export const mockedWrongCategoryRegister = {
  category: "Drama",
};

export const mockedBookRegister = {
  name: "Stranger in a Strange Land",
  author: "Robert A. Heinlein",
  categoryId: "",
};

export const mockedSecondBookRegister = {
  name: "Macbeth",
  author: "William Shakespeare",
  categoryId: "",
};

export const mockedWrongBookRegister = {
  name: "To Kill a Mockingbird",
  author: "Harper Lee",
};

export const mockedWrongUserLogin: IUserLogin = {
  email: "emailteste@mail.com",
  password: "1234567",
};

export const mockedUpdatedUser: IUserRequest = {
  name: "Leoo",
  email: "email@email.com",
  password: "1234567",
};
