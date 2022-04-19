import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { TodoService } from  '../../service/todo.service'
import { Todo } from '../../models/Todo'

@Component({
  selector: 'app-todo-upd',
  templateUrl: './todo-upd.component.html',
  styleUrls: ['./todo-upd.component.css']
})
export class TodoUpdComponent implements OnInit {
  @Input('todo') todo?: Todo;

  constructor(private builder: FormBuilder,) { }

  ngOnInit(): void {
    this.todoForm.setValue({
      title:    this.todo?.title,
      body:     this.todo?.body,
      category: this.todo?.categoryId,
      state:    this.todo?.state,
    })
  }

  title = new FormControl(this.todo?.title, [
    Validators.required
  ]);
  body = new FormControl(this.todo?.body, [
    Validators.required
  ]);
  category = new FormControl(this.todo?.categoryId, [
    Validators.required
  ]);
  state = new FormControl(this.todo?.state, [
    Validators.required
  ]);

  todoForm = this.builder.group({
    title:    this.title,
    body:     this.body,
    category: this.category,
    state:    this.state,
  });

  update() {
    console.log('todo upd')
    this.todo = undefined;
  }
}
