import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { Todo } from '../models/Todo'
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';

describe('TodoServiceService', () => {
  let service: TodoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const url = `${environment.apiUrl}/todo`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(TodoService);
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTodoList status 200 pattern', () => {
    service.getTodoList().subscribe(actual => {
      expect(actual).toEqual(todoListResponseMock)
    })
    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(todoListResponseMock);
    httpTestingController.verify();
  });

  it('getTodoList error status 404 pattern', () => {
    const errorResponse = {
      status: 404, statusText: 'Not Found'
    };
    service.getTodoList().subscribe(actual => {
      expect(actual).toEqual([])
    })
    const request = httpTestingController.expectOne(url);
    request.error(new ErrorEvent('http'), errorResponse);
  });

  it('registerTodo status 200 pattern', () => {
    service.registerTodo(todoListResponseMock[0]).subscribe(actual => {
      expect(actual).toEqual(null)
    })
    const request = httpTestingController.expectOne(`${url}`);
    expect(request.request.method).toEqual('POST');
    request.flush(null);
    httpTestingController.verify();
  });

  it('updateTodo status 200 pattern', () => {
    service.updateTodo(todoListResponseMock[0]).subscribe(actual => {
      expect(actual).toEqual(null)
    })
    const request = httpTestingController.expectOne(`${url}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(null);
    httpTestingController.verify();
  });

  it('deleteTodo status 200 pattern', () => {
    const id: number = 1
    service.deleteTodo(id).subscribe(actual => {
      expect(actual).toEqual(null)
    })
    const request = httpTestingController.expectOne(`${url}/${id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(null);
    httpTestingController.verify();
  });

  it('deleteTodo error status 404 pattern', () => {
    const id: number = 1
    const errorResponse = {
      status: 404, statusText: 'Not Found'
    };
    service.deleteTodo(id).subscribe(actual => {
      expect(actual).toEqual(-1)
    })
    const request = httpTestingController.expectOne(`${url}/${id}`);
    request.error(new ErrorEvent('http'), errorResponse);
  });

  const todoListResponseMock: Todo[] = [
    {
      id: 1,
      categoryId: 3,
      title: 'testTitle',
      body: 'testBody',
      state: 0,
    },
    {
      id: 2,
      categoryId: 4,
      title: 'testTitleB',
      body: 'testBodyB',
      state: 1,
    },
  ];
});
