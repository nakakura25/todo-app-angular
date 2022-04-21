import { Color } from './Color';

export interface Category {
  id:           number;
  name:         string;
  slug:         string;
  color:        number;
}

export interface CategoryListResponse {
  'category': Category[];
  'color':    Color[];
}
