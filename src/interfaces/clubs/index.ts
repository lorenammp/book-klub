export interface IClubRequest {
  name: string;
  description: string;
  admId: string;
  cover: string;
}

export interface IClub {
  admId: string;
  name: string;
  description: string;
  cover: string;
  isActive: boolean;
  createdAt: string;
}

export interface IThreadRequest {
  clubId: string;
  authorId: string;
  title: string;
  text: string;
}

export interface IThread {
  clubId: string;
  authorId: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}
