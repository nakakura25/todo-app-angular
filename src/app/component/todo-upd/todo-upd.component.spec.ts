import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { TodoUpdComponent } from './todo-upd.component';
import { TodoService } from  '../../service/todo.service'



describe('TodoUpdComponent', () => {
  let component: TodoUpdComponent;
  let fixture: ComponentFixture<TodoUpdComponent>;

  let routerSpy: { navigate: jasmine.Spy };
  let todoServiceSpy: { updateTodo: jasmine.Spy }

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['updateTodo']);
    await TestBed.configureTestingModule({
      declarations: [ TodoUpdComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TodoService, useValue: todoServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoUpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
