import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Todoアプリ';

  ngOnInit(): void  {
//     setTimeout(() => {
//       this.title = 'Changed Todo アプリ'
//     }, 3000)
  }
}
