import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, Params } from '@angular/router';

import { CategoryService } from  '../../service/category.service'
import { ColorService } from  '../../service/color.service'

import { Category } from '../../models/Category'
import { Color } from '../../models/Color'

@Component({
  selector: 'app-category-upd',
  templateUrl: './category-upd.component.html',
  styleUrls: ['./category-upd.component.css']
})
export class CategoryUpdComponent implements OnInit, OnChanges {
  @Input('category') category?: Category;
  @Input('colorMap') colorMap?: Map<number, string>;
  @Output('upd') edited = new EventEmitter<Category>();

  headTitle = 'カテゴリー更新';
  selectedValue = 0;
  colorOptions: Color[] = [];

  constructor(private builder: FormBuilder,
    private categoryService: CategoryService,
    private colorService: ColorService,
    private router: Router,) { }

  ngOnInit(): void {
    this.colorOptions = this.colorService.getColorOptions();
  }

  ngOnChanges(): void {
    if (this.category) {
      this.categoryForm.setValue({
        name:  this.category?.name,
        slug:  this.category?.slug,
        color: this.category?.color
      });
      this.selectedValue = Number(this.color.value);
      this.router.navigate(['/category'], { fragment: 'category_upd' })
    }
  }

  name = new FormControl('', [
    Validators.required
  ]);
  slug = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9a-zA-Z]+')
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
    const category: Category = {
      id:    Number(this.category?.id),
      name:  this.name.value,
      slug:  this.slug.value,
      color: Number(this.color.value)
    }
    this.categoryService.updateCategory(category).subscribe(
      response => {
        this.edited.emit(response !== undefined ? this.category : undefined);
        this.reset();
      }
    )
  }

  colorChange(color: FormControl) {
    this.selectedValue = Number(this.color.value);
  }

  reset() {
    this.category = undefined
    this.router.navigate(['/category'], { fragment: '' })
  }
}
