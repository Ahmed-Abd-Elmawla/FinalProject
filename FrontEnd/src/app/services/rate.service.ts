import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http:HttpClient) { }

  getPostRates(id:any){
    return this.http.get(`http://127.0.0.1:8000/api/rates/${id}`);
  }

  getUserRate(post_id:any,id:any){
    return this.http.get(`http://127.0.0.1:8000/api/rate/${post_id}/${id}`);
  }

  addRate(data:any){
    return this.http.post(`http://127.0.0.1:8000/api/rate`,data);
  }
}
