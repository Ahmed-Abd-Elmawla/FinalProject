import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AngularStarRatingModule } from 'angular-star-rating';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RateFormComponent } from './rate-form/rate-form.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyComponent } from './property/property.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { Home2Component } from './home2/home2.component';
import { Home2detailsComponent } from './home2details/home2details.component';
import { Home2cardComponent } from './home2card/home2card.component';
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
    RateFormComponent,
    PropertyListComponent,
    PropertyComponent,
    AboutUsComponent,
    HomeComponent,
    CommentsComponent,
    NavbarComponent,
    HomeComponent,
    Home2Component,
    Home2detailsComponent,
    Home2cardComponent,
    UserprofileComponent,
    AdminPostsComponent,
    SideBarComponent,
    AdminUsersComponent,
    AdminCategoriesComponent,
    DashbordComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    // AngularStarRatingModule
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbAccordionModule,
    NgbTooltipModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
