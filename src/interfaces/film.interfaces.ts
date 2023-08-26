import { User } from "../entities/user.entities";

export interface iFilmRequest {
  name: string;
  gender: string;
  durationInMinutes: number;
  launchYear: number;
  synopsis: string;
}

export interface iFilmResponse {
  id: string;
  name: string;
  gender: string;
  durationInMinutes: number;
  launchYear: number;
  synopsis: string;
  isActive: boolean;
  user: User;
}
