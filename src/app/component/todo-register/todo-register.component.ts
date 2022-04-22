import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, Params } from '@angular/router';

import { TodoService } from  '../../service/todo.service'
import { CategoryService } from  '../../service/category.service'

import { Todo } from '../../models/Todo'
import { Category } from '../../models/Category'

@Component({
  selector: 'app-todo-register',
  templateUrl: './todo-register.component.html',
  styleUrls: ['./todo-register.component.css']
})
export class TodoRegisterComponent implements OnInit {
  headTitle = 'Todo登録'
  categoryOptions: Category[] = [];

  constructor(private builder: FormBuilder,
    private todoService: TodoService,
    private categoryService: CategoryService,
    private route: Router,) { }

  ngOnInit(): void {
    this.categoryOptions = this.categoryService.getCategoryOptions();
    this.category.setValue(this.categoryOptions ? this.categoryOptions[0]?.id : 0);
  }

  title = new FormControl('', [
    Validators.required
  ]);
  body = new FormControl('', [
    Validators.required
  ]);
  category = new FormControl('', [
    Validators.required
  ]);

  todoForm = this.builder.group({
    title:    this.title,
    body:     this.body,
    category: this.category,
  });

  register() {
    const todo: Todo = {
      id:            0,
      categoryId:    Number(this.category.value),
      title:         this.title.value,
      body:          this.body.value,
      state:         0
    }
    this.todoService.registerTodo(todo).subscribe(
      response => {
        this.route.navigate(['/']);
      }
    )
  }

  back() {
    this.route.navigate(['/']);
  }
}
