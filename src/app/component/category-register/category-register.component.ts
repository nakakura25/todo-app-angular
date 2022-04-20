import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-register',
  templateUrl: './category-register.component.html',
  styleUrls: ['./category-register.component.css']
})
export class CategoryRegisterComponent implements OnInit {
  headTitle = 'カテゴリー登録';

  constructor() { }

  ngOnInit(): void {
  }

}
