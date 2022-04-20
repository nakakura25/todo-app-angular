export interface Todo {
  id:           number;
  categoryId:   number;
  title:        string;
  body:         string;
  state:        number;
  stateName:    string;
  color:        number;
  categoryName: string;
}

export interface FormTodo {
  id:           number;
  categoryId:   number;
  title:        string;
  body:         string;
  state:        number;
}

export interface TodoListResponse {
  'todos': Array<Todo>;
  'color': Array<Color>;
}

export interface Color {
  id:           number;
  color:        string;
}
