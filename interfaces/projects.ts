import type { User } from './users';

export type Project = {
  
  _id: string,
  name: string;
  description: string;
  lokation: string;
  startDate: Date;
  endDate: Date;
  status: string;
  contract: string;
  _createdBy: User['id'];
}

export type newProject = Omit<Project, '_id'> & {
  _createdBy?: string
  }