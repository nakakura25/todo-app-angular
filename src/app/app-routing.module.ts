import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoUpdComponent } from './component/todo-upd/todo-upd.component';
import { TodoRegisterComponent } from './component/todo-register/todo-register.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { CategoryUpdComponent } from './component/category-upd/category-upd.component';
import { CategoryRegisterComponent } from './component/category-register/category-register.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'todo/upd', component: TodoUpdComponent },
  { path: 'todo/store', component: TodoRegisterComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/upd', component: CategoryUpdComponent },
  { path: 'category/store', component: CategoryRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 50],
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
