import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RateService {
  private apiUrl = '/api/rates';

  constructor(private http: HttpClient) { }

  createRate(rateValue: number, userId: number, ownerId: number) {
    const rate = { rate_value: rateValue, user_id: userId, owner_id: ownerId };
    return this.http.post(this.apiUrl, rate);
  }
}
