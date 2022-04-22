import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Color } from '../models/Color'
import { environment } from '../../environments/environment';
import { HttpErrorService } from './http-error.service'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  colorOptions: Color[] = [];
  colorMap: Map<number, string> = new Map<number, string>();

  constructor(private http: HttpClient,
  private httpErrorService: HttpErrorService,) { }

  url = `${environment.apiUrl}/color`;

  getColorMap(): Observable<Color[]> {
    return this.http.get<Color[]>(this.url).pipe(
      catchError(this.httpErrorService.handleError<Color[]>('getColorMap', []))
    )
  }

  setColorOptions(color: Color[]): void {
    this.colorOptions = color;
  }

  getColorOptions(): Color[] {
    return this.colorOptions;
  }
}
