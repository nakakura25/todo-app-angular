import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './component/todo-list/todo-list.component';
import { TodoUpdComponent } from './component/todo-upd/todo-upd.component';
import { TodoRegisterComponent } from './component/todo-register/todo-register.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'todo/upd', component: TodoUpdComponent },
  { path: 'todo/store', component: TodoRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
