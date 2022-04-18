import { Component, OnInit } from '@angular/core';

import { TodoService } from  '../../service/todo.service'
import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private todoService: TodoService,) { }

  todos: Todo[] = [];
  catMap: any;
  stateMap: any;
  ngOnInit(): void {
    this.todoService.getCategoryMap((response: Todo[]) => {
      this.catMap = response;
    });
    this.todoService.getStateMap((response: Todo[]) => {
      this.stateMap = response;
    });
    this.todoService.getTodoList((response: Todo[]) => {
      this.todos = response;
    });
  }

  title = 'Todo一覧';
}
