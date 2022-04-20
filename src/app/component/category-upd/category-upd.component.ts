import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, Params } from '@angular/router';

import { CategoryService } from  '../../service/category.service'

import { Category } from '../../models/Category'
import { Color } from '../../models/Color'

@Component({
  selector: 'app-category-upd',
  templateUrl: './category-upd.component.html',
  styleUrls: ['./category-upd.component.css']
})
export class CategoryUpdComponent implements OnChanges {
  @Input('category') category?: Category;
  @Input('colorOptions') colorOptions?: Color[];
  @Output('upd') edited = new EventEmitter<Category>();

  headTitle = 'カテゴリー更新';
  colorMap: Map<number, string> = new Map<number, string>();
  selectedValue = 0;

  constructor(private builder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,) { }

  ngOnChanges(): void {
    if (this.category) {
      this.categoryForm.setValue({
        name:  this.category?.name,
        slug:  this.category?.slug,
        color: this.category?.color
      });
    }
  }

  name = new FormControl('', [
    Validators.required
  ]);
  slug = new FormControl('', [
    Validators.required
  ]);
  color = new FormControl('', [
    Validators.required
  ]);

  categoryForm = this.builder.group({
    name:  this.name,
    slug:  this.slug,
    color: this.color,
  });

  update() {
  }

  colorChange(color: FormControl) {
    this.selectedValue = Number(this.color.value);
  }

  back() {
    this.router.navigate(['/category']);
  }
}
