import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from  '../../service/todo.service'
import { CategoryService } from  '../../service/category.service'
import { ColorService } from  '../../service/color.service'
import { StateService } from  '../../service/state.service'

import { Todo } from '../../models/Todo'
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
  stateMap:  Map<number, string> = new Map<number, string>();
  categoryMap: Map<number, Category> = new Map<number, Category>();
  selectedTodo?: Todo;

  constructor(private todoService: TodoService,
    private categoryService: CategoryService,
    private colorService: ColorService,
    private stateService: StateService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showTodoList();
    this.getColor();
    this.getStatus();
  }

  showTodoList() {
    this.todoService.getTodoList().subscribe(
      (response: Todo[]) => {
        this.todos  = response;
      });
    this.categoryService.getCategoryList().subscribe(
      (response: Category[]) => {
        this.categoryService.setCategoryOptions(response);
        response?.map((res: Category) => {
          this.categoryMap.set(res['id'], res);
        })
      }
    )
  }

  getStatus() {
    this.stateService.getStatus().subscribe(
      (response: Status[]) => {
        this.stateService.setStatusOptions(response);
        response?.map((res: Status) => {
          this.stateMap.set(res['code'], res['name']);
        });
      })
  }

  getColor() {
    this.colorService.getColor().subscribe(
      (response: Color[]) => {
        this.colorService.setColorOptions(response)
        response?.map((res: Color) => {
          this.colorMap.set(res['id'], res['color']);
        });
      })
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
