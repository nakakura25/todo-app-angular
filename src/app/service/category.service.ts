import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Category } from '../models/Category'
import { Color } from '../models/Color'
import { environment } from '../../environments/environment';
import { HttpErrorService } from './http-error.service'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryOptions: Category[] = [];

  constructor(private http: HttpClient,
  private httpErrorService: HttpErrorService,) { }

  url = `${environment.apiUrl}/category`;

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url).pipe(
      catchError(this.httpErrorService.handleError<Category[]>('getCategoryList', []))
    )
  }

  registerCategory(category: Category) {
    return this.http.post(this.url, {
      id:    0,
      name:  category['name'],
      slug:  category['slug'],
      color: category['color']
    }).pipe(
      catchError(this.httpErrorService.handleError<Category>('registerCategory'))
    )
  }

  updateCategory(category: Category) {
    return this.http.put(this.url, {
      id:    category['id'],
      name:  category['name'],
      slug:  category['slug'],
      color: category['color']
    }).pipe(
      catchError(this.httpErrorService.handleError<Category>('updateCategory'))
    )
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.httpErrorService.handleError<number>('deleteCategory', -1))
    )
  }

  setCategoryOptions(category: Category[]): void {
    this.categoryOptions = category;
  }

  getCategoryOptions(): Category[] {
    return this.categoryOptions;
  }
}
