import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Todo, TodoListResponse, FormTodo } from '../models/Todo'
import { Category } from '../models/Category'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  categoryOptions: Category[] = [];

  constructor(private http: HttpClient,) { }

  url = 'http://localhost:9000/api/todo';

  getTodoList(): Observable<TodoListResponse> {
    return this.http.get<TodoListResponse>(this.url)
  }

  registerTodo(todo: FormTodo): Observable<unknown> {
    return this.http.post(this.url, {
      id:         0,
      categoryId: todo['categoryId'],
      title:      todo['title'],
      body:       todo['body'],
      state:      todo['state']
    })
  }

  updateTodo(todo: FormTodo): Observable<unknown> {
    return this.http.put(this.url, {
      id:         todo['id'],
      categoryId: todo['categoryId'],
      title:      todo['title'],
      body:       todo['body'],
      state:      todo['state']
    })
  }

  deleteTodo(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`);
  }

  setCategoryOptions(category: Category[]) {
    this.categoryOptions = category;
  }

  getCategoryOptions(): Category[] {
    return this.categoryOptions;
  }

}
