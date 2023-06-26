import { Component } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../Model/comment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  commentText: string = '';
  comments: Comment[] = []; // Array to store comments
  commentSubscription: Subscription | undefined;

  constructor(private commentsService: CommentsService) { }

  addComment(commentText: string): void {
    const newComment: Comment = {
      id: 0, // The ID will be assigned by the server upon creation
      user_id: 0, // Replace with the actual user ID
      post_id: 0, // Replace with the actual post ID
      comment: commentText,
      created_at: '',
      updated_at: ''
    };

    this.commentSubscription = this.commentsService.addComment(newComment).subscribe({
      next: (comment: Comment) => {
        // Handle successful comment creation
        console.log('Comment added:', comment);
        this.comments.push(comment); // Add the new comment to the comments array
        this.commentText = ''; // Clear the textarea
      },
      error: (error: any) => {
        // Handle error in comment creation
        console.error('Failed to add comment:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }
}