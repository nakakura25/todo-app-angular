import { Component, OnInit } from '@angular/core';

import { CategoryService } from  '../../service/category.service'

import { Category, CategoryListResponse } from '../../models/Category'
import { Color } from '../../models/Color'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  headTitle = 'カテゴリー一覧'
  categories: Category[] = [];
  colorMap: Map<number, string> = new Map<number, string>();
  selectedCategory?: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.showCategoryList();
  }

  showCategoryList() {
    this.categoryService.getCategoryList().subscribe(
      (response: CategoryListResponse) => {
        this.categories = response["category"];
        response["color"].map((res: Color) => {
          this.colorMap.set(res['id'], res['color']);
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  onSelect(category: Category) {
    console.log('onSelect');
    this.selectedCategory = category;
  }

  onDelete(category: Category) {
    console.log('onDelete');
    this.selectedCategory;
  }

  onUpdate(category: Category) {
    console.log('onUpdate');
  }
}
