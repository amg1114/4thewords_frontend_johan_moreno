import type { Category } from './category.interface';
import type { Canton, District, Province } from './location.interface';
import type { User } from './user.interface';

export interface Legend {
  id: number;
  name: string;
  description: string;
  date: string;
  image_url: string;
  publisher: User;
  category: Category;
  district: District;
  province: Province;
  canton: Canton;
}
