import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRegisterComponent } from './todo-register.component';

describe('TodoRegisterComponent', () => {
  let component: TodoRegisterComponent;
  let fixture: ComponentFixture<TodoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoRegisterComponent ]
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
