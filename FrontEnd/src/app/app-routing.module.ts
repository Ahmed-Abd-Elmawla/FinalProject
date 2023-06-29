import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommentsComponent} from './comments/comments.component';
import {HomeComponent} from './home/home.component';
import {Home2Component} from './home2/home2.component';
import {Home2detailsComponent} from './home2details/home2details.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path:"comments",
    component: CommentsComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  { path: 'home2',
   component: Home2Component
  },
  { path: 'home2card-details/:id',
   component: Home2detailsComponent
  },
  {
    path: 'user-profile',
    component: UserprofileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
