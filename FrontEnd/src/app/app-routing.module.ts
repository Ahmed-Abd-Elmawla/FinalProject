import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './user/dashboard/dashboard.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './route_guard';

const routes: Routes = [
   
  { path:'Dashboard' ,  component:DashboardComponent  , canActivate:[AuthGuard]},


  { path:'Register' ,  component:RegisterComponent },

  { path:'Login' ,  component:LoginComponent },

  { path:'' ,  component:HomeComponent , canActivate:[AuthGuard]},


import {CommentsComponent} from './comments/comments.component';
import {HomeComponent} from './home/home.component';
import {Home2Component} from './home2/home2.component';
import {Home2detailsComponent} from './home2details/home2details.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

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
