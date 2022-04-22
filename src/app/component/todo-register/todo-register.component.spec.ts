import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TodoRegisterComponent } from './todo-register.component';
import { TodoService } from  '../../service/todo.service'
import { CategoryService } from  '../../service/category.service'


describe('TodoRegisterComponent', () => {
  let component: TodoRegisterComponent;
  let fixture: ComponentFixture<TodoRegisterComponent>;

  let routerSpy: { navigate: jasmine.Spy };
  let todoServiceSpy: { registerTodo: jasmine.Spy, getCategoryOptions: jasmine.Spy };
  let categoryServiceSpy: { getCategoryList: jasmine.Spy, setCategoryOptions: jasmine.Spy }

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['registerTodo', 'getCategoryOptions']);
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
