import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  //Get All Posts
  getAllPosts() {
    return this.http.get('http://localhost:8000/api/posts');
  }

  //Create New Post
  createPost(data: any) {
    return this.http.post('http://localhost:8000/api/posts', data);
  }

  //Get A Post By It's Id
  getPost(id: any) {
    return this.http.get(`http://localhost:8000/api/posts/${id}`);
  }

  //Update A Post By It's Id
  updatePost(id: any, data: any) {
    return this.http.post(`http://localhost:8000/api/posts/${id}`, data);
  }

  //Delete A Post
  deletePost(id: any) {
    return this.http.delete(`http://localhost:8000/api/posts/${id}`);
  }
}
