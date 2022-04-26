import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CategoryService } from './category.service';
import { Category } from '../models/Category'
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const url = `${environment.apiUrl}/category`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(CategoryService);
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCategoryList status 200 pattern', () => {
    service.getCategoryList().subscribe(actual => {
      expect(actual).toEqual(categoryMock)
    })
    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(categoryMock);
    httpTestingController.verify();
  });

  it('getCategoryList error status 404 pattern', () => {
    const errorResponse = {
      status: 404, statusText: 'Not Found'
    };
    service.getCategoryList().subscribe(actual => {
      expect(actual).toEqual([])
    })
    const request = httpTestingController.expectOne(url);
    request.error(new ErrorEvent('http'), errorResponse);
  });

  it('registerCategory status 200 pattern', () => {
    service.registerCategory(categoryMock[0]).subscribe(actual => {
      expect(actual).toEqual(null)
    })
    const request = httpTestingController.expectOne(`${url}`);
    expect(request.request.method).toEqual('POST');
    request.flush(null);
    httpTestingController.verify();
  });

  it('updateCategory status 200 pattern', () => {
    service.updateCategory(categoryMock[0]).subscribe(actual => {
      expect(actual).toEqual(null)
    })
    const request = httpTestingController.expectOne(`${url}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(null);
    httpTestingController.verify();
  });

  it('deleteCategory status 200 pattern', () => {
    const id: number = 1
    service.deleteCategory(id).subscribe(actual => {
      expect(actual).toEqual(null)
    })
    const request = httpTestingController.expectOne(`${url}/${id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(null);
    httpTestingController.verify();
  });

  it('deleteCategory error status 404 pattern', () => {
    const id: number = 1
    const errorResponse = {
      status: 404, statusText: 'Not Found'
    };
    service.deleteCategory(id).subscribe(actual => {
      expect(actual).toEqual(-1)
    })
    const request = httpTestingController.expectOne(`${url}/${id}`);
    request.error(new ErrorEvent('http'), errorResponse);
  });

  it('setCategoryOptions', () => {
    service.setCategoryOptions(categoryMock)
    expect(service.getCategoryOptions()).toEqual(categoryMock)
  });

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
      color: 3,
    },
  ]
});
