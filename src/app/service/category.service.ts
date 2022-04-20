import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';

import { Category, CategoryListResponse } from '../models/Category'
import { Color } from '../models/Color'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  colorOptions: Color[] = [];

  constructor(private http: HttpClient,) { }

  url = 'http://localhost:9000/api/category';

  getCategoryList(): Observable<CategoryListResponse> {
    return this.http.get<CategoryListResponse>(this.url);
  }

  setColorOptions(colors: Color[]) {
    this.colorOptions = colors;
  }

  getColorOptions(): Color[] {
    return this.colorOptions;
  }

}
