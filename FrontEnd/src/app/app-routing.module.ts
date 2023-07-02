
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

import { AuthGuard } from './route_guard';



import {CommentsComponent} from './comments/comments.component';

import {Home2Component} from './home2/home2.component';
import {Home2detailsComponent} from './home2details/home2details.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AdminPostsComponent } from './admin-posts/admin-posts.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { DashbordComponent as DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'Login',
    component:LoginComponent
  },

  {
    path:'Register',
    component:RegisterComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'AdminPosts',
    component: AdminPostsComponent,
  },
  {
    path: 'AdminUsers',
    component: AdminUsersComponent,
  },
  {
    path: 'AdminCategories',
    component: AdminCategoriesComponent,
  },

  {
    path: '',
    component:HomeComponent,
    canActivate:[AuthGuard] // this for route gaureded -------->>>
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },

  { path: 'home2', component: Home2Component },

  { path: 'home2card-details/:id', component: Home2detailsComponent },

  {
    path: 'userPosts',
    component: UserprofileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

