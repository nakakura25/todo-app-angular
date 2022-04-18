import { Component, OnInit } from '@angular/core';

import { TodoService } from  '../../service/todo.service'
import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  title = 'Todo一覧';
  todos: Todo[] = this.todoService.getTodos();

  stateMap = new Map([
    [0, 'TODO'],
    [1, '進行中'],
    [2, '完了'],
  ]);
}