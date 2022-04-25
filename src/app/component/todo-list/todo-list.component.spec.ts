import { Component, NO_ERRORS_SCHEMA, Output, EventEmitter } from '@angular/core'
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from  '../../service/todo.service'
import { CategoryService } from  '../../service/category.service'
import { ColorService } from  '../../service/color.service'
import { StateService } from  '../../service/state.service'

import { Todo } from '../../models/Todo'
import { Color } from '../../models/Color'
import { Status } from '../../models/Status'
import { Category } from '../../models/Category'

import { ToastrService } from 'ngx-toastr';

import { Observable, of } from 'rxjs';

import {By} from '@angular/platform-browser';

@Component({selector: 'app-category-upd', template: ''})
class CategoryUpdStubComponent {
  @Output('upd') edited = new EventEmitter<Todo>();
}

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
      declarations: [ TodoListComponent, CategoryUpdStubComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ColorService, useValue: colorServiceSpy },
        { provide: StateService, useValue: stateServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('OnInit success', () => {
    todoServiceSpy.getTodoList.and.returnValue(of(todosMock));
    categoryServiceSpy.getCategoryList.and.returnValue(of(categoryMock));
    colorServiceSpy.getColor.and.returnValue(of(colorMock));
    stateServiceSpy.getStatus.and.returnValue(of(statusMock));
    component.ngOnInit();
    fixture.detectChanges();
    let cardContent = fixture.nativeElement.querySelector('.card_content');
    let cardFooter = fixture.nativeElement.querySelector('.card_footer');
    let todo_footer = fixture.nativeElement.querySelector('.todo_footer');
    let todo_header = fixture.nativeElement.querySelector('.todo_header');
    let todo_upd = fixture.nativeElement.querySelector('.todo_upd');
    expect(cardContent.children[0].textContent).toEqual(`Title:${todosMock[0].title}`)
    expect(cardContent.children[1].textContent).toEqual(`Body:${todosMock[0].body}`)
    expect(cardContent.children[2].textContent).toEqual(`Status:${statusMock[0].name}`)
    expect(cardContent.children[3].textContent).toEqual(`Category:${categoryMock[1].name}`)
    expect(cardContent.style.backgroundColor).toEqual(colorMock[1].color)
    expect(cardFooter).toBeTruthy()
    expect(todo_footer).toBeTruthy()
    expect(todo_header).toBeTruthy()
    expect(todo_upd).toBeFalsy()
  });

  it('showTodoList error(result empty)', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let cardContent = fixture.nativeElement.querySelector('.card_content');
    expect(cardContent).toEqual(null)
  });

  it('showTodoList success', () => {
    let categoryMap: Map<number, Category> = new Map<number, Category>();
    todoServiceSpy.getTodoList.and.returnValue(of(todosMock));
    categoryServiceSpy.getCategoryList.and.returnValue(of(categoryMock));
    component.showTodoList();
    expect(component.todos).toEqual(todosMock);
    categoryMock.map(res => {
      categoryMap.set(res['id'], res);
    });
    expect(component.categoryMap).toEqual(categoryMap);
  });

  it('showTodoList error', () => {
    let categoryMap: Map<number, Category> = new Map<number, Category>();
    todoServiceSpy.getTodoList.and.returnValue(of([]));
    categoryServiceSpy.getCategoryList.and.returnValue(of([]));
    component.showTodoList();
    expect(component.todos).toEqual([]);
    expect(component.categoryMap).toEqual(categoryMap);
  });

  it('getStatus success', () => {
    let stateMap:  Map<number, string> = new Map<number, string>();
    stateServiceSpy.getStatus.and.returnValue(of(statusMock));
    component.getStatus();
    statusMock.map(res => {
      stateMap.set(res['code'], res['name']);
    });
    expect(component.stateMap).toEqual(stateMap);
  });

  it('getStatus success', () => {
    let colorMap: Map<number, string> = new Map<number, string>();
    colorServiceSpy.getColor.and.returnValue(of(colorMock));
    component.getColor();
    colorMock.map(res => {
      colorMap.set(res['id'], res['color']);
    });
    expect(component.colorMap).toEqual(colorMap);
  });


  it('onSelect todos', fakeAsync(() => {
    todoServiceSpy.getTodoList.and.returnValue(of(todosMock));
    categoryServiceSpy.getCategoryList.and.returnValue(of(categoryMock));
    colorServiceSpy.getColor.and.returnValue(of(colorMock));
    stateServiceSpy.getStatus.and.returnValue(of(statusMock));
    component.ngOnInit();
    fixture.detectChanges();
    const cardContent = fixture.debugElement.query(By.css('.card_content'));
    cardContent.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.selectedTodo).toEqual(todosMock[0]);
    let todo_upd = fixture.nativeElement.querySelector('#todo_upd');
    expect(todo_upd).toBeTruthy()
  }));

  it('onDelete todos', fakeAsync(() => {
    todoServiceSpy.getTodoList.and.returnValue(of(todosMock));
    categoryServiceSpy.getCategoryList.and.returnValue(of(categoryMock));
    colorServiceSpy.getColor.and.returnValue(of(colorMock));
    stateServiceSpy.getStatus.and.returnValue(of(statusMock));
    todoServiceSpy.deleteTodo.and.returnValue(of(undefined));
    component.ngOnInit();
    fixture.detectChanges();
    const cardFooter = fixture.debugElement.query(By.css('.card_footer_item'));
    cardFooter.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedTodo).toEqual(undefined);
    expect(toastrSpy.success).toHaveBeenCalledWith(`delete todo ${todosMock[0].title}`, 'DELETE');
  }));

  it('onDelete todos error', fakeAsync(() => {
    todoServiceSpy.getTodoList.and.returnValue(of(todosMock));
    categoryServiceSpy.getCategoryList.and.returnValue(of(categoryMock));
    colorServiceSpy.getColor.and.returnValue(of(colorMock));
    stateServiceSpy.getStatus.and.returnValue(of(statusMock));
    todoServiceSpy.deleteTodo.and.returnValue(of(-1));
    component.ngOnInit();
    fixture.detectChanges();
    const cardFooter = fixture.debugElement.query(By.css('.card_footer_item'));
    cardFooter.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedTodo).toEqual(undefined);
    expect(toastrSpy.error).toHaveBeenCalledWith(`cause error`, 'DELETE');
  }));

  it('onUpdate todos', fakeAsync(() => {
    todoServiceSpy.getTodoList.and.returnValue(of(todosMock));
    categoryServiceSpy.getCategoryList.and.returnValue(of(categoryMock));
    colorServiceSpy.getColor.and.returnValue(of(colorMock));
    stateServiceSpy.getStatus.and.returnValue(of(statusMock));
    component.ngOnInit();
    fixture.detectChanges();
    const cardContent = fixture.debugElement.query(By.css('.card_content'));
    cardContent.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    const todo_upd = fixture.debugElement.query(By.css('app-todo-upd'));
    const spy = spyOn(component, 'onUpdate')
    todo_upd.triggerEventHandler('upd', null);
    expect(spy).toHaveBeenCalled();
  }));

  it('onUpdate todos', fakeAsync(() => {
    todoServiceSpy.getTodoList.and.returnValue(of(todosMock));
    categoryServiceSpy.getCategoryList.and.returnValue(of(categoryMock));
    colorServiceSpy.getColor.and.returnValue(of(colorMock));
    stateServiceSpy.getStatus.and.returnValue(of(statusMock));
    todoServiceSpy.getTodoList.and.returnValue(of(todosMock));
    component.ngOnInit();
    fixture.detectChanges();
    component.onUpdate(todosMock[0])
    expect(toastrSpy.success).toHaveBeenCalledWith(`update todo ${todosMock[0].title}`, 'UPDATE');
  }));

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
  const colorMock = [
    {
      id: 1,
      color: 'red'
    },
    {
      id: 2,
      color: 'blue'
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
