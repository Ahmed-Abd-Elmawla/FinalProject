import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './route_guard';
import {CommentsComponent} from './comments/comments.component';
import {Home2Component} from './home2/home2.component';
import {Home2detailsComponent} from './home2details/home2details.component';
import {ChatComponent} from './chat/chat.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AdminPostsComponent } from './admin-posts/admin-posts.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { DashbordComponent} from './dashbord/dashbord.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent} from './about/about.component';
import { AdminPendingComponent } from './admin-pending/admin-pending.component';
import { AdminGuard } from './Guards/admin.guard';
import { AdminContactComponent } from './admin-contact/admin-contact.component';

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
    path: 'Dashboard',
    component: DashbordComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'AdminPosts',
    component: AdminPostsComponent,
    canActivate:[AdminGuard],
  },
  {
    path: 'AdminPending',
    component: AdminPendingComponent,
    canActivate:[AdminGuard],
  },
  {
    path: 'AdminUsers',
    component: AdminUsersComponent,
    canActivate:[AdminGuard],
  },
  {
    path: 'AdminCategories',
    component: AdminCategoriesComponent,
    canActivate:[AdminGuard],
  },
  {
    path: 'AdminContacts',
    component: AdminContactComponent,
    canActivate:[AdminGuard],
  },
  {
    path: '',
    component:HomeComponent,
    // canActivate:[AuthGuard] // this for route gaureded -------->>>
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },
  { path: 'chat',
   component: ChatComponent
},

  { path: 'home2',
   component: Home2Component 
  },

  { path: 'home2card-details/:id',
   component: Home2detailsComponent 
  },

  {
    path: 'userPosts',
    component: UserprofileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

