import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ColorService } from './color.service';
import { Color } from '../models/Color'
import { environment } from '../../environments/environment';

describe('ColorService', () => {
  let service: ColorService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const url = `${environment.apiUrl}/color`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(ColorService);
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getColor status 200 pattern', () => {
    service.getColor().subscribe(actual => {
      expect(actual).toEqual(colorMock)
    })
    const request = httpTestingController.expectOne(url);
    expect(request.request.method).toEqual('GET');
    request.flush(colorMock);
    httpTestingController.verify();
  });

  it('getColor error status 404 pattern', () => {
    const errorResponse = {
      status: 404, statusText: 'Not Found'
    };
    service.getColor().subscribe(actual => {
      expect(actual).toEqual([])
    })
    const request = httpTestingController.expectOne(url);
    request.error(new ErrorEvent('http'), errorResponse);
  });

  it('setColorOptions', () => {
    service.setColorOptions(colorMock)
    expect(service.getColorOptions()).toEqual(colorMock)
  });


  const colorMock = [
    {
      id: 1,
      color: 'Red'
    },
    {
      id: 2,
      color: 'Blue'
    },
  ]
});
