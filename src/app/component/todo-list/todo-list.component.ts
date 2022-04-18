import { Component, OnInit } from '@angular/core';

import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'Todo一覧';
  todos: Todo[] = [
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

  stateMap = new Map([
    [0, 'TODO'],
    [1, '進行中'],
    [2, '完了'],
  ]);
}
