import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommentsComponent} from './comments/comments.component';
import {HomeComponent} from './home/home.component';
import {Home2Component} from './home2/home2.component';
import {Home2detailsComponent} from './home2details/home2details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:"comments",
    component: CommentsComponent
  },
  { path: 'home2',
   component: Home2Component 
  },
  { path: 'home2card-details/:id',
   component: Home2detailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
