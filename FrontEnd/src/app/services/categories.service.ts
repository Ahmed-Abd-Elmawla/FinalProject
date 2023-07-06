import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  //Get All Categories
  getAllCategories() {
    return this.http.get('http://localhost:8000/api/categories');
  }

  //Create new category
  createCategory(data: any) {
    return this.http.post('http://localhost:8000/api/categories', data);
  }
  //Update A category By It's Id
  updateCategory(id: any, data: any) {
    return this.http.post(`http://localhost:8000/api/categories/${id}`, data);
  }

  //Delete A category
  deleteCategory(id: any) {
    return this.http.delete(`http://localhost:8000/api/categories/${id}`);
  }
}
