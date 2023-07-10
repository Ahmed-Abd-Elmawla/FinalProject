import { Component, Input } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../Model/comment';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() propertyItem!: any;
  commentText: string = '';
  comments: Comment[] = []; // Array to store comments
  commentSubscription: Subscription | undefined;
  dataStored!: any;
  constructor(private commentsService: CommentsService) {
    this.dataStored = JSON.parse(localStorage.getItem('user')||'{}') ;
  }

  addComment(commentText: string): void {
    const newComment: Comment = {
      id: 0,
      user_id: this.dataStored.id,
      owner_id: 0,
      post_id: this.propertyItem.id,
      comment: commentText,
      created_at: '',
      updated_at: ''
    };

    this.commentSubscription = this.commentsService.addComment(newComment).subscribe({
      next: (comment: Comment) => {
        // Handle successful comment creation
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'review has been added.',
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 0);
        });
        console.log('Comment added:', comment);
        // this.comments.push(comment); // Add the new comment to the comments array
        // this.commentText = ''; // Clear the textarea
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
