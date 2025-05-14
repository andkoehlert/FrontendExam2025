import type { User } from './users';

export interface Task {
  _id: string;  // Use string for the ObjectId representation
  name: string;
  status: 'todo' | 'inProgress' | 'done';
  createdAt: Date;
  _createdBy: string;  // Assuming this is the ID of the user who created the task
  projectId: string | null;  // Use string for projectId (it references the Project)
  employees: { employeeId: string }[];  // Use string for employeeId
}
export type newTask = Omit<Task, '_id'> & {
  _createdBy?: string
  }