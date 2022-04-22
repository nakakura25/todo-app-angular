import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Status } from '../models/Status'
import { environment } from '../../environments/environment';
import { HttpErrorService } from './http-error.service'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  statusOptions: Status[] = [];

  constructor(private http: HttpClient,
  private httpErrorService: HttpErrorService,) { }

  url = `${environment.apiUrl}/status`;

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.url).pipe(
      catchError(this.httpErrorService.handleError<Status[]>('getStatus', []))
    )
  }

  setStatusOptions(status: Status[]): void {
    this.statusOptions = status;
  }

  getStatusOptions(): Status[] {
    return this.statusOptions;
  }

}
