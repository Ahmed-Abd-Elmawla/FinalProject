import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { IncludeModule } from './include/include.module';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { Home2Component } from './home2/home2.component';
import { Home2detailsComponent } from './home2details/home2details.component';
import { Home2cardComponent } from './home2card/home2card.component';
import { ChatComponent } from './chat/chat.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPostsComponent } from './admin-posts/admin-posts.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { DashbordComponent } from './dashbord/dashbord.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommentsComponent,
    NavbarComponent,
    HomeComponent,
    Home2Component,
    Home2detailsComponent,
    Home2cardComponent,
    ChatComponent,
    UserprofileComponent,
    AdminPostsComponent,
    SideBarComponent,
    AdminUsersComponent,
    AdminCategoriesComponent,
    DashbordComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    IncludeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbAccordionModule,
    NgbTooltipModule,
    ReactiveFormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
