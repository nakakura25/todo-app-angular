import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { TodoService } from  '../../service/todo.service'
import { Todo, FormTodo } from '../../models/Todo'

@Component({
  selector: 'app-todo-register',
  templateUrl: './todo-register.component.html',
  styleUrls: ['./todo-register.component.css']
})
export class TodoRegisterComponent {

  constructor(private builder: FormBuilder,
  private todoService: TodoService) { }

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
    const todo: FormTodo = {
      id:            0,
      categoryId:    Number(this.category.value),
      title:         this.title.value,
      body:          this.body.value,
      state:         0
    }
    this.todoService.registerTodo(todo).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
}
