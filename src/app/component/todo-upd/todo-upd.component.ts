import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { TodoService } from  '../../service/todo.service'
import { CategoryService } from  '../../service/category.service'
import { StateService } from  '../../service/state.service'

import { Todo } from '../../models/Todo'
import { Status } from '../../models/Status'
import { Category } from '../../models/Category'

@Component({
  selector: 'app-todo-upd',
  templateUrl: './todo-upd.component.html',
  styleUrls: ['./todo-upd.component.css']
})
export class TodoUpdComponent implements OnInit, OnChanges {
  @Input('todo') todo?: Todo;
  @Output('upd') edited = new EventEmitter<Todo>();

  headTitle = 'Todo更新';
  stateOptions: Status[] = [];
  categoryOptions: Category[] = [];

  constructor(private builder: FormBuilder,
    private todoService: TodoService,
    private categoryService: CategoryService,
    private stateService: StateService,
    private router: Router,) { }

  ngOnInit(): void {
    this.stateOptions = this.stateService.getStatusOptions();
    this.categoryOptions = this.categoryService.getCategoryOptions();
  }

  ngOnChanges(): void {
    if (this.todo) {
      this.todoForm.setValue({
        title:    this.todo?.title,
        body:     this.todo?.body,
        category: this.todo?.categoryId,
        state:    this.todo?.state
      });
      this.router.navigate(['/'], { fragment: 'todo_upd' })
    }
  }

  title = new FormControl(this.todo?.title, [
    Validators.required
  ]);
  body = new FormControl(this.todo?.body, [
    Validators.required
  ]);
  category = new FormControl(this.todo?.categoryId, [
    Validators.pattern('[1-9]+')
  ]);
  state = new FormControl(this.todo?.state);

  todoForm = this.builder.group({
    title:    this.title,
    body:     this.body,
    category: this.category,
    state:    this.state
  });

  update() {
    const todo: Todo = {
      id:            Number(this.todo?.id),
      categoryId:    Number(this.category.value),
      title:         this.title.value,
      body:          this.body.value,
      state:         Number(this.state.value)
    }
    this.todoService.updateTodo(todo).subscribe(
      response => {
        this.edited.emit(response !== undefined ? this.todo : undefined);
        this.reset();
      }
    )
  }

  reset() {
    this.todo = undefined;
    this.router.navigate(['/'], { fragment: '' })
  }
}
