import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user :any;
  logoUrl: string = 'assets/images/logo.png';

ngOnInit(){
  this.user = JSON.parse(localStorage.getItem('user')||'{}') ;
}

logout(){

  localStorage.removeItem('user');
  window.location.reload();
}
   
}
