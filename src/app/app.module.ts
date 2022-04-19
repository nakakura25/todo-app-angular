import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoUpdComponent } from './component/todo-upd/todo-upd.component';
import { TodoRegisterComponent } from './component/todo-register/todo-register.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoUpdComponent,
    TodoRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
