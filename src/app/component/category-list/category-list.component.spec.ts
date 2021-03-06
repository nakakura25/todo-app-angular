import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CategoryListComponent } from './category-list.component';
import { CategoryService } from  '../../service/category.service'
import { ColorService } from  '../../service/color.service'
import { ToastrService } from 'ngx-toastr';

import { Observable, of } from 'rxjs';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

  let routerSpy: { navigate: jasmine.Spy };
  let categoryServiceSpy: { getCategoryList: jasmine.Spy,
   setColorOptions: jasmine.Spy, deleteCategory: jasmine.Spy }
  let toastrSpy: { success: jasmine.Spy, error: jasmine.Spy };
  let colorServiceSpy: { getColor: jasmine.Spy, setColorOptions: jasmine.Spy }

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoryList', 'setColorOptions', 'deleteCategory']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    colorServiceSpy = jasmine.createSpyObj('ColorService', ['getColor', 'setColorOptions']);
    await TestBed.configureTestingModule({
      declarations: [ CategoryListComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: ColorService, useValue: colorServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    categoryServiceSpy.getCategoryList.and.returnValue(of([]));
    colorServiceSpy.getColor.and.returnValue(of([]));
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
