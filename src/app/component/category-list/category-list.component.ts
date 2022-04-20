import { Component, OnInit } from '@angular/core';

import { Category } from '../../models/Category'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  headTitle = 'カテゴリー一覧'
//   categories: Category[] = [];
  selectedCategory?: Category;

  constructor() { }

  ngOnInit(): void {
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

  categories: Category[] = [
    {
      id: 1,
      name: 'AAA',
      slug: 'AAA',
      color: 1,
    },
    {
      id: 2,
      name: 'BBB',
      slug: 'CCC',
      color: 3,
    },
    {
      id: 3,
      name: 'CCC',
      slug: 'CCC',
      color: 4,
    },
    {
      id: 4,
      name: 'DDD',
      slug: 'DDD',
      color: 2,
    },
  ];
}
