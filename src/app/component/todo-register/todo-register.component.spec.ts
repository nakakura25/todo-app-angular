import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TodoRegisterComponent } from './todo-register.component';
import { TodoService } from  '../../service/todo.service'


describe('TodoRegisterComponent', () => {
  let component: TodoRegisterComponent;
  let fixture: ComponentFixture<TodoRegisterComponent>;

  let routerSpy: { navigate: jasmine.Spy };
  let todoServiceSpy: { registerTodo: jasmine.Spy, getCategoryOptions: jasmine.Spy };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['registerTodo', 'getCategoryOptions']);
    await TestBed.configureTestingModule({
      declarations: [ TodoRegisterComponent ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TodoService, useValue: todoServiceSpy },
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
