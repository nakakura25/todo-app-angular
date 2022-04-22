import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Category, CategoryListResponse } from '../models/Category'
import { Color } from '../models/Color'
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  colorOptions: Color[] = [];

  constructor(private http: HttpClient,) { }

  url = `${environment.apiUrl}/category`;

  getCategoryList(): Observable<CategoryListResponse> {
    return this.http.get<CategoryListResponse>(this.url).pipe(
      catchError(this.handleError<CategoryListResponse>('getCategoryList', this.empty()))
    )
  }

  registerCategory(category: Category) {
    return this.http.post(this.url, {
      id:    0,
      name:  category['name'],
      slug:  category['slug'],
      color: category['color']
    }).pipe(
      catchError(this.handleError<Category>('registerCategory'))
    )
  }

  updateCategory(category: Category) {
    return this.http.put(this.url, {
      id:    category['id'],
      name:  category['name'],
      slug:  category['slug'],
      color: category['color']
    }).pipe(
      catchError(this.handleError<Category>('updateCategory'))
    )
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError<number>('deleteCategory', -1))
    )
  }

  setColorOptions(colors: Color[]) {
    this.colorOptions = colors;
  }

  getColorOptions(): Color[] {
    return this.colorOptions;
  }

  private empty(): CategoryListResponse {
    const empty: CategoryListResponse = {
      category: [],
      color: [],
    }
    return empty;
  }

  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed ${error.message}`);
      console.error(error);
      return of(result as T);
    }
  }
}
