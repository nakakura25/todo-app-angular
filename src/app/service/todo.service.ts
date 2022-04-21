import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Todo, TodoListResponse, FormTodo } from '../models/Todo'
import { Category } from '../models/Category'
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  categoryOptions: Category[] = [];

  constructor(private http: HttpClient,) { }

  url = `${environment.apiUrl}/todo`;

  getTodoList(): Observable<TodoListResponse> {
    return this.http.get<TodoListResponse>(this.url)
      .pipe(
        catchError(this.handleError<TodoListResponse>('getTodoList', this.empty()))
      );
  }

  registerTodo(todo: FormTodo): Observable<unknown> {
    return this.http.post(this.url, {
      id:         0,
      categoryId: todo['categoryId'],
      title:      todo['title'],
      body:       todo['body'],
      state:      todo['state']
    }).pipe(
      catchError(this.handleError<FormTodo>('registerTodo'))
    )
  }

  updateTodo(todo: FormTodo): Observable<unknown> {
    return this.http.put(this.url, {
      id:         todo['id'],
      categoryId: todo['categoryId'],
      title:      todo['title'],
      body:       todo['body'],
      state:      todo['state']
    }).pipe(
      catchError(this.handleError<Todo>('updateTodo'))
    )
  }

  deleteTodo(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError<number>('deleteTodo', -1))
    )
  }

  setCategoryOptions(category: Category[]) {
    this.categoryOptions = category;
  }

  getCategoryOptions(): Category[] {
    return this.categoryOptions;
  }

  private empty(): TodoListResponse {
    const empty: TodoListResponse = {
      todos: [],
      color: [],
      category: [],
      status: [],
    }
    return empty;
  }

  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed ${error.message}`);
      console.error(error);
      return of(result as T);
    }
  }
}
