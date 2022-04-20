import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { TodoService } from  '../../service/todo.service'
import { Todo, FormTodo } from '../../models/Todo'
import { Status } from '../../models/Status'
import { Category } from '../../models/Category'

@Component({
  selector: 'app-todo-upd',
  templateUrl: './todo-upd.component.html',
  styleUrls: ['./todo-upd.component.css']
})
export class TodoUpdComponent implements OnChanges {
  @Input('todo') todo?: Todo;
  @Input('stateOptions') stateOptions?: Status[];
  @Input('categoryOptions') categoryOptions?: Category[];
  @Output('upd') edited = new EventEmitter<Todo>();

  constructor(private builder: FormBuilder,
  private todoService: TodoService) { }

  ngOnChanges(): void {
    if (this.todo) {
      this.todoForm.setValue({
        title:    this.todo?.title,
        body:     this.todo?.body,
        category: this.todo?.categoryId,
        state:    this.todo?.state
      })
    }
  }

  title = new FormControl(this.todo?.title, [
    Validators.required
  ]);
  body = new FormControl(this.todo?.body, [
    Validators.required
  ]);
  category = new FormControl(this.todo?.categoryId);
  state = new FormControl(this.todo?.state);

  todoForm = this.builder.group({
    title:    this.title,
    body:     this.body,
    category: this.category,
    state:    this.state
  });

  update() {
    const todo: FormTodo = {
      id:            Number(this.todo?.id),
      categoryId:    Number(this.category.value),
      title:         this.title.value,
      body:          this.body.value,
      state:         Number(this.state.value)
    }
    this.todoService.updateTodo(todo).subscribe(
      response => {
        this.todo = undefined;
        this.edited.emit(this.todo)
      },
      error => {
        console.log(error);
      }
    )
  }
}
