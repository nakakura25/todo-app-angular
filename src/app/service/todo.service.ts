import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Todo } from '../models/Todo'

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,) { }

  getTodoList(callback: any) {
    this.http.get('/api/todo/index').subscribe(
      response => {
        console.log(response);
        callback(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  getCategoryMap(callback: any) {
    this.http.get('/api/todo/catmap').subscribe(
      response => {
        let map = new Map<number, string>();
        Object.entries(response).forEach(res => {
          map.set(Number(res[1][0]), res[1][1])
        });
        callback(map);
      },
      error => {
        console.log(error);
      }
    )
  }

  getStateMap(callback: any) {
    this.http.get('/api/todo/statemap').subscribe(
      response => {
        let map = new Map<number, string>();
        Object.entries(response).forEach(res => {
          map.set(Number(res[1][0]), res[1][1])
        });
        callback(map);
      },
      error => {
        console.log(error);
      }
    )
  }

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
