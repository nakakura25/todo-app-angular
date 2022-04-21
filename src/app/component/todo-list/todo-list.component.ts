import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from  '../../service/todo.service'
import { Todo, TodoListResponse } from '../../models/Todo'
import { Color } from '../../models/Color'
import { Status } from '../../models/Status'
import { Category } from '../../models/Category'

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  headTitle = 'Todo一覧';
  todos: Todo[] = [];
  colorMap: Map<number, string> = new Map<number, string>();
  stateOptions: Status[] = [];
  categoryOptions: Category[] = [];
  selectedTodo?: Todo;

  constructor(private todoService: TodoService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showTodoList();
  }

  showTodoList() {
    this.todoService.getTodoList()
      .subscribe(
      (response: TodoListResponse) => {
        this.todos  = response["todos"];
        this.stateOptions = response["status"];
        response["color"].map((res: Color) => {
          this.colorMap.set(res['id'], res['color']);
        });
        this.categoryOptions = response["category"].filter(cat => cat.id !== 0);
        this.todoService.setCategoryOptions(this.categoryOptions);
      }
    )
  }

  onSelect(todo: Todo) {
    this.selectedTodo = todo;
    this.router.navigate(['/'], { fragment: '' })
  }

  onDelete(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe(
      response => {
        this.selectedTodo = undefined;
        this.showTodoList();
        if (response === -1) {
          this.toastr.error(`cause error`, 'DELETE');
        } else {
          this.toastr.success(`delete todo ${todo.title}`, 'DELETE');
        }
      }
    )
  }

  onUpdate(todo: Todo) {
    if(todo !== undefined) {
      this.toastr.success(`update todo ${todo.title}`, 'UPDATE');
    } else {
      this.toastr.error(`cause error`, 'UPDATE');
    }
    this.showTodoList();
  }
}
