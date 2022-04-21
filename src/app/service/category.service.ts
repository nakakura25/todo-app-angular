import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Category, CategoryListResponse } from '../models/Category'
import { Color } from '../models/Color'
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  colorOptions: Color[] = [];

  constructor(private http: HttpClient,) { }

  url = `${environment.apiUrl}/category`;

  getCategoryList(): Observable<CategoryListResponse> {
    return this.http.get<CategoryListResponse>(this.url);
  }

  registerCategory(category: Category) {
    return this.http.post(this.url, {
      id:    0,
      name:  category['name'],
      slug:  category['slug'],
      color: category['color']
    });
  }

  updateCategory(category: Category) {
    return this.http.put(this.url, {
      id:    category['id'],
      name:  category['name'],
      slug:  category['slug'],
      color: category['color']
    });
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setColorOptions(colors: Color[]) {
    this.colorOptions = colors;
  }

  getColorOptions(): Color[] {
    return this.colorOptions;
  }

}
