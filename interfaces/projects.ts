import type { User } from './users';
import type { Product } from './products';
import type { Employee } from './employees';
export type ProjectProduct = {
  productId: Product['_id'];
  quantity: number;
};
export type ProjectEmployee = {
  employeeId: Employee;
  name: string;
  position: string;
};

export type Project = {
  
  _id: string,
  name: string;
  description: string;
  lokation: string;
  startDate?: string | Date;
  endDate?: string | Date;
  status: string;
  contract: string;
  _createdBy: User['id'];
  products?: ProjectProduct[];
  employees?: ProjectEmployee[];
}

export type newProject = Omit<Project, '_id'> & {
  _createdBy?: string
  }