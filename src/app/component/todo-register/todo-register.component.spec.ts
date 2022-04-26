import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TodoRegisterComponent } from './todo-register.component';
import { TodoService } from  '../../service/todo.service'
import { CategoryService } from  '../../service/category.service'

import { Todo } from '../../models/Todo'
import { Status } from '../../models/Status'
import { Category } from '../../models/Category'

import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';


describe('TodoRegisterComponent', () => {
  let component: TodoRegisterComponent;
  let fixture: ComponentFixture<TodoRegisterComponent>;

  let routerSpy: { navigate: jasmine.Spy };
  let todoServiceSpy: { registerTodo: jasmine.Spy };
  let categoryServiceSpy: { getCategoryOptions: jasmine.Spy }

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['registerTodo']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoryOptions']);
    await TestBed.configureTestingModule({
      declarations: [ TodoRegisterComponent ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoRegisterComponent);
    component = fixture.componentInstance;
    categoryServiceSpy.getCategoryOptions.and.returnValue(categoryMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.todoForm).toBeTruthy();
    const title = fixture.nativeElement.querySelector('#title');
    const body = fixture.nativeElement.querySelector('#body');
    const category = fixture.nativeElement.querySelector('#category');
    const reset = fixture.nativeElement.querySelector('#reset');
    const submitBtn = fixture.nativeElement.querySelector('#submitBtn');
    expect(title).toBeTruthy();
    expect(body).toBeTruthy();
    expect(category.value).toBeTruthy('1');
    expect(reset).toBeTruthy();
    expect(submitBtn.disabled).toEqual(true);
  });

  it('input', () => {
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
    categoryElement.value = '2';
    categoryElement.dispatchEvent(new Event('change'))
    expect(component.todoForm.value.category).toBe('2')

    fixture.detectChanges();

    const submitBtn = fixture.nativeElement.querySelector('#submitBtn');
    expect(submitBtn.disabled).toEqual(false);
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
    category.setValue('');
    const errors = category.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('register', (done: DoneFn) => {
    todoServiceSpy.registerTodo.and.returnValue(of({}))

    const submit = fixture.debugElement.query(By.css('#form'))
    submit.triggerEventHandler('submit', null)
    expect(routerSpy.navigate.calls.any()).toBe(true);
    done();
  });

  it('reset btn', () => {
    const reset = fixture.debugElement.query(By.css('#reset'))
    reset.triggerEventHandler('click', null)
    expect(routerSpy.navigate.calls.any()).toBe(true);
  });

  it('categpry options empty', () => {
    categoryServiceSpy.getCategoryOptions.and.returnValue(undefined);
    component.ngOnInit();
    expect(component.category.value).toEqual(0);
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
});
