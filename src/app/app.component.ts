import { Component, OnInit } from '@angular/core';

import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../aws-exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Todoアプリ';
  showTodo: boolean = false;
  constructor() {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void  {
//     setTimeout(() => {
//       this.title = 'Changed Todo アプリ'
//     }, 3000)
  }

  public formFields = {
    signIn: {
      username: {
        labelHidden: true,
        placeholder: 'Enter Your Email Here',
        isRequired: true,
      },
      password: {
        labelHidden: true,
        placeholder: 'Enter Your Email Here',
        isRequired: true,
      },
    },
  };
}
