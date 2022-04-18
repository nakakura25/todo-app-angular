import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Todo } from '../models/Todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,) { }

  getTodos(): Todo[] {
    return [
      {
        id:         1,
        categoryId: 1,
        title:      'hogehoge',
        body:       'fugafuga',
        state:      0,
      },
      {
        id:         2,
        categoryId: 2,
        title:      'title sample',
        body:       'body sample',
        state:      1,
      },
      {
        id:         3,
        categoryId: 1,
        title:      'title test',
        body:       'body test',
        state:      2,
      },
    ]
  };
}
