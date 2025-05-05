import type { User } from './users';
import type { Product } from './products';

export type ProjectProduct = {
  productId: Product['_id'];
  quantity: number;
};

export type Project = {
  
  _id: string,
  name: string;
  description: string;
  lokation: string;
  startDate?: Date;
  endDate?: Date;
  status: string;
  contract: string;
  _createdBy: User['id'];
  products?: ProjectProduct[];
}

export type newProject = Omit<Project, '_id'> & {
  _createdBy?: string
  }