import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, Params } from '@angular/router';

import { CategoryService } from  '../../service/category.service'

import { Color } from '../../models/Color'

@Component({
  selector: 'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls: ['./category-register.component.css']
})
export class CategoryRegisterComponent implements OnInit {
  headTitle = 'カテゴリー登録';
  colorMap: Map<number, string> = new Map<number, string>();
  colorOptions: Color[] = [];
  selectedValue = 0;

  constructor(private builder: FormBuilder,
    private categoryService: CategoryService,
    private route: Router,) { }

  ngOnInit(): void {
    this.colorOptions = this.categoryService.getColorOptions();
    this.colorOptions.map((res: Color) => {
      this.colorMap.set(res['id'], res['color']);
    });
    this.color.setValue(this.colorOptions[0]?.id);
    this.selectedValue = Number(this.color.value);
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

  colorChange(color: FormControl) {
    this.selectedValue = Number(this.color.value);
  }

  register() {
  }

  back() {
    this.route.navigate(['/category']);
  }

}
