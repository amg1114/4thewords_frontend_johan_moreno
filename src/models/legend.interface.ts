import type { Category } from './category.interface';
import type { District } from './district.interface';
import type { User } from './user.interface';

export interface Legend {
  id: number;
  name: string;
  description: string;
  date: Date;
  image_url: string;
  publisher: User;
  category: Category;
  district: District;
}
