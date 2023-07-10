import { Component } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css']
})
export class AdminReviewsComponent {
reviews!:any;
review_!:any;
name_!:any;

constructor(private review:CommentsService, private modalService: NgbModal){}

ngOnInit() {
this.fetchedData();

}


fetchedData(){
  this.review.getComments().subscribe((res:any) => {this.reviews=res,console.log(res);

});
}

view(model:any,name:any,review:any){
  this.review_=review;
  this.name_ = name;
  this.modalService.open(model, { centered: true });
}


delete(id:any){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#0d6efd',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.review.deleteComment(id).subscribe(
        (res) => {
          this.fetchedData();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Review has been deleted.',
            showConfirmButton: false,
            timer: 3000,
          })
        },
        (err) => {
          if (err)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.message,
            }),
              console.error(err);
        }
      );
    }
  });
}
}
