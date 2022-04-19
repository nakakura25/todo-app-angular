import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoUpdComponent } from './component/todo-upd/todo-upd.component';
import { TodoRegisterComponent } from './component/todo-register/todo-register.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { CategoryUpdComponent } from './component/category-upd/category-upd.component';
import { CategoryRegisterComponent } from './component/category-register/category-register.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoUpdComponent,
    TodoRegisterComponent,
    CategoryListComponent,
    CategoryUpdComponent,
    CategoryRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
