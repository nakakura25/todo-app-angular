import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

import { CategoryService } from  '../../service/category.service'
import { ColorService } from  '../../service/color.service'

import { Category } from '../../models/Category'
import { Color } from '../../models/Color'

import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  headTitle = 'カテゴリー一覧'
  categories: Category[] = [];
  colorOptions?: Color[];
  colorMap: Map<number, string> = new Map<number, string>();
  selectedCategory?: Category;

  constructor(private categoryService: CategoryService,
    private colorService: ColorService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.showCategoryList();
    this.getColor();
  }

  showCategoryList() {
    this.categoryService.getCategoryList().subscribe(
      (response: Category[]) => {
        this.categories = response;
      }
    )
  }

  getColor() {
    this.colorService.getColorMap().subscribe(
      (response: Color[]) => {
        this.colorService.setColorOptions(response)
        response?.map((res: Color) => {
          this.colorMap.set(res['id'], res['color']);
        });
      }
    )
  }

  onSelect(category: Category) {
    this.selectedCategory = category;
    this.router.navigate(['/category'], { fragment: '' })
  }

  onDelete(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe(
      response => {
        this.selectedCategory = undefined;
        this.showCategoryList();
        if (response === -1) {
          this.toastr.error(`cause error`, 'DELETE');
        } else {
          this.toastr.success(`delete category ${category.name}`, 'DELETE');
        }
      }
    )
  }

  onUpdate(category: Category) {
    if(category !== undefined) {
      this.toastr.success(`update category ${category.name}`, 'UPDATE');
    } else {
      this.toastr.error(`cause error`, 'UPDATE');
    }
    this.showCategoryList();
  }
}
