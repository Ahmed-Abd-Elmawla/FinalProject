import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PropertyListService {

  constructor(private http: HttpClient) { }
    //Get All Posts
    getAllPosts() {
      return this.http.get('http://localhost:8000/api/posts');
    }
}
