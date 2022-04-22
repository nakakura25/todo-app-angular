import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { CategoryRegisterComponent } from './category-register.component';
import { CategoryService } from  '../../service/category.service'
import { ColorService } from  '../../service/color.service'

describe('CategoryRegisterComponent', () => {
  let component: CategoryRegisterComponent;
  let fixture: ComponentFixture<CategoryRegisterComponent>;

  let routerSpy: { navigate: jasmine.Spy };
  let categoryServiceSpy: { registerCategory: jasmine.Spy, getColorOptions: jasmine.Spy }
  let colorServiceSpy: { getColorOptions: jasmine.Spy }


  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['registerCategory', 'getColorOptions']);
    colorServiceSpy = jasmine.createSpyObj('ColorService', ['getColorOptions']);
    await TestBed.configureTestingModule({
      declarations: [ CategoryRegisterComponent ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ColorService, useValue: colorServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
