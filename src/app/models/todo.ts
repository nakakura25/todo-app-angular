import { Category } from './Category';
import { Color } from './Color';
import { Status } from './Status';

export interface Todo {
  id:           number;
  categoryId:   number;
  title:        string;
  body:         string;
  state:        number;
}
