import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Todo } from '../models/Todo'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,) { }

  getTodoList(callback: any) {
    interface responseObj {
      [key: string]: any
    }
    this.http.get('http://localhost:9000/api/todo/index').subscribe(
      (response: responseObj) => {
        const todos    = 'todos' in response ? response["todos"] : '';
        const color = 'color' in response ? response["color"] : '';
        let colorMap = new Map<number, string>();
        color.map((res: any) => {
          colorMap.set(Number(res[0]), res[1])
        });
        console.log(response);
        callback(todos, colorMap);
      },
      error => {
        console.log(error);
      }
    )
  }
}
