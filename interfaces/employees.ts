import type { User } from './users';

export type Employee = {
  
  _id: string,
  name: string;
  position: string;
  description: string;
  email: string;
  profileImage: string;
  bio: string;
  _createdBy: User['id'];
}

export type newEmployee = Omit<Employee, '_id'> & {
  _createdBy?: string
  }