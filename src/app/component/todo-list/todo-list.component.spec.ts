import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from  '../../service/todo.service'
import { ToastrService } from 'ngx-toastr';

import { Observable, of } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let routerSpy: { navigate: jasmine.Spy };
  let todoServiceSpy: { getTodoList: jasmine.Spy,
   setCategoryOptions: jasmine.Spy, deleteTodo: jasmine.Spy  };
  let toastrSpy: { success: jasmine.Spy };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTodoList', 'setCategoryOptions', 'deleteTodo']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['toastrSpy']);
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    todoServiceSpy.getTodoList.and.returnValue(of({}));
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
