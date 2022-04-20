import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Todo, TodoListResponse } from '../models/Todo'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,) { }

  getTodoList(): Observable<TodoListResponse> {
    return this.http.get<TodoListResponse>('http://localhost:9000/api/todo/index')
  }

  deleteTodo(id: number): Observable<unknown> {
    const url = `http://localhost:9000/api/todo/${id}/delete`;
    return this.http.delete(url);
  }
}
