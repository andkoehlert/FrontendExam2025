import type { User } from './users';

export interface LoginResponse {
  token: string;
  user: User; 
  userId: string;
}
