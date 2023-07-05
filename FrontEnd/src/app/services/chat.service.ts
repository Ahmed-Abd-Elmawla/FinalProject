import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  constructor(private http: HttpClient) {}

  // postMessage(message: string): Observable<any> {
  //   return this.http.post('http://localhost:8000/api/messages', { message });
  // }

  postMessage(message: string, recipientId: number): Observable<any> {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const senderId = JSON.parse(userStr).id; // Retrieve sender ID from localStorage
      const payload = {
        message: message,
        sender_id: senderId,
        receiver_id: recipientId
      };
      return this.http.post<any>('http://localhost:8000/api/messages', payload);
    } else {
      return throwError('User information not found in localStorage');
    }
  }
  
  
  
  getMessages(senderId: number, receiverId: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/messages?sender_id=${senderId}&receiver_id=${receiverId}`);
  }
}
