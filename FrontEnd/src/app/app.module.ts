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
import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPostsComponent } from './admin-posts/admin-posts.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyComponent } from './property/property.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AboutComponent } from './about/about.component';
import { AdminPendingComponent } from './admin-pending/admin-pending.component';
import { AdminGuard } from './Guards/admin.guard';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ContactComponent } from './contact/contact.component';
import { AdminPendingUComponent } from './admin-pending-u/admin-pending-u.component';
import { FooterComponent } from './footer/footer.component';
import { StripeModule } from "stripe-angular";
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPromoteComponent } from './admin-promote/admin-promote.component';





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
    DashbordComponent,
    PropertyListComponent,
    PropertyComponent,
    PostDetailsComponent,
    CarouselComponent,
    AboutComponent,
    AdminPendingComponent,
    AdminContactComponent,
    MapComponent,
    ContactComponent,
    AdminPendingUComponent,
    FooterComponent,
    PaymentFormComponent,
    AdminReviewsComponent,
    AdminPromoteComponent,

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
    ReactiveFormsModule,
    NgbCarouselModule,
    NgxPaginationModule,
    NgbDropdownModule,
    GoogleMapsModule,
    NgbRatingModule

  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
