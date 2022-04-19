import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { TodoService } from  '../../service/todo.service'
import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todo-register',
  templateUrl: './todo-register.component.html',
  styleUrls: ['./todo-register.component.css']
})
export class TodoRegisterComponent implements OnInit {

  constructor(private builder: FormBuilder,
  private todoService: TodoService) { }

  ngOnInit(): void {
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
    console.log('ok');
  }
}
