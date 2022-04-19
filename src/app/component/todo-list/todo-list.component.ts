import { Component, OnInit } from '@angular/core';

import { TodoService } from  '../../service/todo.service'
import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  colorMap: Map<number, string> = new Map<number, string>();
  selectedTodo?: Todo;

  constructor(private todoService: TodoService,) { }

  ngOnInit(): void {
    this.todoService.getTodoList((todos: Todo[],
     color: Map<number, string>) => {
      this.todos = todos;
      this.colorMap = color;
    });
  }

  onSelect(todo: Todo) {
    console.log(todo)
    this.selectedTodo = todo;
  }

  onDelete(todo: Todo) {
    console.log(todo)
  }
  title = 'Todo一覧';
}
