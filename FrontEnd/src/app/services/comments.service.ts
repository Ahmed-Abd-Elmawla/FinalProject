import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../Model/comment'; 
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:8000/api/comments');
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('http://localhost:8000/api/comments', comment);
  }

  getCommentById(commentId: number): Observable<Comment> {
    return this.http.get<Comment>('http://localhost:8000/api/comments/' + commentId);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>('http://localhost:8000/api/comments/' + comment.id, comment);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8000/api/comments/' + commentId);
  }
}
