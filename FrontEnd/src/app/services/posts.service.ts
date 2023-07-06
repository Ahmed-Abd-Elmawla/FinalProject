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

  //Get posts by user_id
  getPostsByUserId(id: any) {
    return this.http.get(`http://localhost:8000/api/posts/user/${id}`);
  }

  //Get posts by category_id
  getPostsByCategoryId(id: any) {
    return this.http.get(`http://localhost:8000/api/posts/category/${id}`);
  }
  // Get posts by category_name
  private baseUrl='http://localhost:8000/api/posts';
  getPostsByCategory(categoryName: string) {
    return this.http.get(`${this.baseUrl}?category_name=${categoryName}`);
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
