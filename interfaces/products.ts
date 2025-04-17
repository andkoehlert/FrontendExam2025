import type { User } from './users';

export type Product = {
  
  _id: string,
  name: string;
  description: string;
  imageURL: string;
  category: string;
  quantity: number;
  stock: number;
  supplier: string;
  orderDate?: Date;
  arrivalDate?: Date;
  _createdBy: User['id'];
}

export type newProduct = Omit<Product, '_id'> & {
  _createdBy?: string
  }