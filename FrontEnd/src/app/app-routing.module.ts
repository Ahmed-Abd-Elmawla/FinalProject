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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
