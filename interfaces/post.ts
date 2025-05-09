import type { User } from './users';
import type { JSONContent } from '@tiptap/vue-3'

export type Post = {
  
  _id: string,
  title: string;
  content: JSONContent | null;
  authorId: string;
  _createdBy: User['id'];
}

export type newPost = Omit<Post, '_id'> & {
  _createdBy?: string
  }