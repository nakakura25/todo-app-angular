import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Todo } from '../models/Todo'
import { environment } from '../../environments/environment';
import { HttpErrorService } from './http-error.service'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,
    private httpErrorService: HttpErrorService,) { }

  url = `${environment.apiUrl}/todo`;

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url)
      .pipe(
        catchError(this.httpErrorService.handleError<Todo[]>('getTodoList', []))
      );
  }

  registerTodo(todo: Todo): Observable<unknown> {
    return this.http.post(this.url, {
      id:         0,
      categoryId: todo['categoryId'],
      title:      todo['title'],
      body:       todo['body'],
      state:      todo['state']
    }).pipe(
      catchError(this.httpErrorService.handleError<Todo>('registerTodo'))
    )
  }

  updateTodo(todo: Todo): Observable<unknown|number> {
    return this.http.put(this.url, {
      id:         todo['id'],
      categoryId: todo['categoryId'],
      title:      todo['title'],
      body:       todo['body'],
      state:      todo['state']
    }).pipe(
      catchError(this.httpErrorService.handleError<Todo>('updateTodo'))
    )
  }

  deleteTodo(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.httpErrorService.handleError<number>('deleteTodo', -1))
    )
  }
}
