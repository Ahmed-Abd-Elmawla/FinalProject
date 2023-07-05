import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user :any;
  logoUrl: string = 'assets/images/logo.png';
  categories!:any;

  constructor(private req:CategoriesService) {}

ngOnInit(){
  this.user = JSON.parse(localStorage.getItem('user')||'{}') ;
  this.req.getAllCategories().subscribe((res: any) => {
    (this.categories = res);
  });
}

logout(){

  localStorage.removeItem('user');
  window.location.reload();
}

}
