export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface IUserAdmRequest {
  name: string;
  email: string;
  isAdm: boolean;
  password: string;
  avatar: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isAdm: boolean;
  isActive: boolean;
}

export interface IUserAdm {
  isAdm: boolean;
  isActive: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}
