import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register($data:any){
    return this.http.post('http://127.0.0.1:8000/api/register',$data);
  }

  login($data:any){
    return this.http.post('http://127.0.0.1:8000/api/login',$data);
  }
  getAllUsers() {
    return this.http.get('http://127.0.0.1:8000/api/users');
  }

  getUserById(id: number) {
    return this.http.get(`http://127.0.0.1:8000/api/users/${id}`);
  }
}
