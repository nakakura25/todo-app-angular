import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoUpdComponent } from './todo-upd.component';

describe('TodoUpdComponent', () => {
  let component: TodoUpdComponent;
  let fixture: ComponentFixture<TodoUpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoUpdComponent ]
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
