import { User } from "../entities/user.entities";

export interface IFilmRequest {
  name: string;
  gender: string;
  durationInMinutes: number;
  launchYear: number;
  synopsis: string;
}

export interface IFilmResponse {
  id: string;
  name: string;
  gender: string;
  durationInMinutes: number;
  launchYear: number;
  synopsis: string;
  isActive: boolean;
  user: User;
}
