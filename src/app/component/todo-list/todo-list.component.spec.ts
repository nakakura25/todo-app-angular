import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from  '../../service/todo.service'
import { CategoryService } from  '../../service/category.service'
import { ColorService } from  '../../service/color.service'
import { StateService } from  '../../service/state.service'

import { ToastrService } from 'ngx-toastr';

import { Observable, of } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let routerSpy: { navigate: jasmine.Spy };
  let todoServiceSpy: { getTodoList: jasmine.Spy,
   setCategoryOptions: jasmine.Spy, deleteTodo: jasmine.Spy  };
  let categoryServiceSpy: { getCategoryList: jasmine.Spy, setCategoryOptions: jasmine.Spy }
  let colorServiceSpy: { getColor: jasmine.Spy, setColorOptions: jasmine.Spy }
  let stateServiceSpy: { getStatus: jasmine.Spy, setStatusOptions: jasmine.Spy }

  let toastrSpy: { success: jasmine.Spy, error: jasmine.Spy };

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTodoList', 'setCategoryOptions', 'deleteTodo']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoryList', 'setCategoryOptions']);
    colorServiceSpy = jasmine.createSpyObj('ColorService', ['getColor', 'setColorOptions']);
    stateServiceSpy = jasmine.createSpyObj('StateService', ['getStatus', 'setStatusOptions']);
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ColorService, useValue: colorServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    todoServiceSpy.getTodoList.and.returnValue(of([]));
    categoryServiceSpy.getCategoryList.and.returnValue(of([]));
    colorServiceSpy.getColor.and.returnValue(of([]));
    stateServiceSpy.getStatus.and.returnValue(of([]));
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
