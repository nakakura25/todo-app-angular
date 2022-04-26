import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StateService } from './state.service';
import { Status } from '../models/Status'
import { environment } from '../../environments/environment';

describe('StateService', () => {
  let service: StateService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const url = `${environment.apiUrl}/status`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(StateService);
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getStatus status 200 pattern', () => {
    service.getStatus().subscribe(actual => {
      expect(actual).toEqual(statusMock)
    })
    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(statusMock);
    httpTestingController.verify();
  });

  it('getStatus error status 404 pattern', () => {
    const errorResponse = {
      status: 404, statusText: 'Not Found'
    };
    service.getStatus().subscribe(actual => {
      expect(actual).toEqual([])
    })
    const request = httpTestingController.expectOne(url);
    request.error(new ErrorEvent('http'), errorResponse);
  });

  it('setStatusOptions', () => {
    service.setStatusOptions(statusMock)
    expect(service.getStatusOptions()).toEqual(statusMock)
  });


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
