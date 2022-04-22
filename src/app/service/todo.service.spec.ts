import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoService } from './todo.service';
import { Todo, TodoListResponse, FormTodo } from '../models/Todo'
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

  const todoListResponseMock: TodoListResponse = {
    'todos': [{
      id: 1,
      categoryId: 3,
      title: 'testTitle',
      body: 'testBody',
      state: 0,
      stateName: 'TODO',
      color: 12,
      categoryName: 'testCategory'
    }],
    'color': [{
      id: 12,
      color: 'yellow',
    }],
    'category': [{
      id: 3,
      name: 'testCategory',
      slug: 'testSlug',
      color: 1
    }],
    'status': [{
      code: 0,
      name: 'TODO'
    }]
  }
});
