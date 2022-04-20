import { Component, OnInit } from '@angular/core';

import { TodoService } from  '../../service/todo.service'
import { Todo, TodoListResponse, Color } from '../../models/Todo'

import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  title = 'Todo一覧';
  todos: Todo[] = [];
  colorMap: Map<number, string> = new Map<number, string>();
  selectedTodo?: Todo;

  constructor(private todoService: TodoService,) { }

  ngOnInit(): void {
    this.showTodoList();
  }

  showTodoList() {
    this.todoService.getTodoList()
      .subscribe(
      (response: TodoListResponse) => {
        this.todos  = response["todos"];
        response["color"].map((res: Color) => {
          this.colorMap.set(res['id'], res['color']);
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  onSelect(todo: Todo) {
    console.log(todo);
    this.selectedTodo = todo;
  }

  onDelete(todo: Todo) {
    console.log(todo);
    this.todoService.deleteTodo(todo.id).subscribe(
      response => {
        this.showTodoList();
      },
      error => {
        console.log(error);
      }
    )
  }

  onUpdate(todo: Todo) {
    this.showTodoList();
  }
}
