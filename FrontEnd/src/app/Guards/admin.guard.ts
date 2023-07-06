import {  CanActivate,CanActivateFn } from '@angular/router';
import { UserData } from '../Model/user-data';

export class AdminGuard implements CanActivate {
  user!:UserData;
  canActivate(): any {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user?.role_id==1) {
      return true;
    } else {
      window.location.href='';
      return false;
    }
  }
}
