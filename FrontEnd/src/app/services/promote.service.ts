import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromoteService {

  constructor(private http: HttpClient) { }
  addPro(data: any) {
    return this.http.post('http://localhost:8000/api/premiums', data);
  }

  deletePro(id: any) {
    return this.http.delete(`http://localhost:8000/api/premiums/${id}`);
  }

  updatePro(id: any,data:any) {
    return this.http.post(`http://localhost:8000/api/premiums/${id}`,data);
  }

 getAllPosts() {
    return this.http.get(`http://localhost:8000/api/premiums`);
  }

}
