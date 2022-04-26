import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { TodoUpdComponent } from './todo-upd.component';
import { TodoService } from  '../../service/todo.service'
import { CategoryService } from  '../../service/category.service'
import { StateService } from  '../../service/state.service'

import { Todo } from '../../models/Todo'
import { Status } from '../../models/Status'
import { Category } from '../../models/Category'

import {By} from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

describe('TodoUpdComponent', () => {
  let component: TodoUpdComponent;
  let fixture: ComponentFixture<TodoUpdComponent>;

  let routerSpy: { navigate: jasmine.Spy };
  let todoServiceSpy: { updateTodo: jasmine.Spy };
  let categoryServiceSpy: { getCategoryOptions: jasmine.Spy };
  let stateServiceSpy: { getStatusOptions: jasmine.Spy };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['updateTodo']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoryOptions']);
    stateServiceSpy = jasmine.createSpyObj('StateService', ['getStatusOptions']);
    await TestBed.configureTestingModule({
      declarations: [ TodoUpdComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoUpdComponent);
    component = fixture.componentInstance;

    component.todo = todosMock[0];
    stateServiceSpy.getStatusOptions.and.returnValue(statusMock);
    categoryServiceSpy.getCategoryOptions.and.returnValue(categoryMock);

    component.ngOnInit();
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges create', () => {
    const title = fixture.nativeElement.querySelector('#title');
    const body = fixture.nativeElement.querySelector('#body');
    const category = fixture.nativeElement.querySelector('#category');
    const state = fixture.nativeElement.querySelector('#state');
    expect(title.value).toEqual(todosMock[0].title);
    expect(body.value).toEqual(todosMock[0].body);
    expect(Number(category.value)).toEqual(todosMock[0].categoryId);
    expect(Number(state.value)).toEqual(todosMock[0].state);
    expect(routerSpy.navigate.calls.any()).toBe(true);
  });

  it('input forms', () => {
    const titleElement = fixture.debugElement.query(By.css('#title'))
      .nativeElement as HTMLInputElement;
    titleElement.value = 'changedTitle';
    titleElement.dispatchEvent(new Event('input'))
    expect(component.todoForm.value.title).toBe('changedTitle')

    const bodyElement = fixture.debugElement.query(By.css('#body'))
      .nativeElement as HTMLInputElement;
    bodyElement.value = 'changedBody';
    bodyElement.dispatchEvent(new Event('input'))
    expect(component.todoForm.value.body).toBe('changedBody')

    const categoryElement = fixture.debugElement.query(By.css('#category'))
      .nativeElement as HTMLInputElement;
    categoryElement.value = '1';
    categoryElement.dispatchEvent(new Event('change'))
    expect(component.todoForm.value.category).toBe('1')

    const stateElement = fixture.debugElement.query(By.css('#state'))
      .nativeElement as HTMLInputElement;
    stateElement.value = '1';
    stateElement.dispatchEvent(new Event('change'))
    expect(component.todoForm.value.state).toBe('1')
  });

  it('title validation', () => {
    let title = component.todoForm.controls['title'];
    title.setValue('');
    const errors = title.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('body validation', () => {
    let body = component.todoForm.controls['body'];
    body.setValue('');
    const errors = body.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('category validation', () => {
    let category = component.todoForm.controls['category'];
    category.setValue('test');
    const errors = category.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('update', (done: DoneFn) => {
    todoServiceSpy.updateTodo.and.returnValue(of({}))
    component.edited.subscribe((todo: Todo) => {
      expect(todo).toEqual(todosMock[0]);
      done();
    })
    const submit = fixture.debugElement.query(By.css('#form'))
    submit.triggerEventHandler('submit', null)
    expect(component.todo).toEqual(undefined);
    expect(routerSpy.navigate.calls.any()).toBe(true);
  });

  it('update error', (done: DoneFn) => {
    todoServiceSpy.updateTodo.and.returnValue(of(undefined))
    component.edited.subscribe(todo => {
      expect(todo).toEqual(undefined!);
      done();
    });
    const submit = fixture.debugElement.query(By.css('#form'))
    submit.triggerEventHandler('submit', null)
    expect(component.todo).toEqual(undefined);
    expect(routerSpy.navigate.calls.any()).toBe(true);
  });

  it('reset btn', () => {
    const reset = fixture.debugElement.query(By.css('#reset'))
    reset.triggerEventHandler('click', null)
//     reset.nativeElement.click();
    expect(component.todo).toEqual(undefined);
    expect(routerSpy.navigate.calls.any()).toBe(true);
  });


  const todosMock: Todo[] = [
    {
      id: 1,
      categoryId: 2,
      title: 'testTitle',
      body: 'testBody',
      state: 0,
    },
    {
      id: 2,
      categoryId: 1,
      title: 'testTitleB',
      body: 'testBodyB',
      state: 1,
    },
  ]
  const categoryMock: Category[] = [
    {
      id: 1,
      name: 'cateogry',
      slug: 'slug',
      color: 1,
    },
    {
      id: 2,
      name: 'cateogry2',
      slug: 'slug2',
      color: 2,
    },
  ]
  const statusMock: Status[] = [
    {
      code: 0,
      name: 'TODO'
    },
    {
      code: 1,
      name: '進行中'
    },
    {
      code: 2,
      name: '完了'
    },
  ]
});
