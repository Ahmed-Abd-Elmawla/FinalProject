import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { PostsService } from '../services/posts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-pending',
  templateUrl: './admin-pending.component.html',
  styleUrls: ['./admin-pending.component.css']
})
export class AdminPendingComponent {
 //global variables ---------------------------------------------------------------------------------
 allPosts!: any;
 postData!:any;
 constructor(private post: PostsService,private modalService: NgbModal) {}

 ngOnInit() {
   this.post.getPostsByStatus('pending').subscribe((res: any) => {
     (this.allPosts = res), console.log(res);
   });
 }


 view(post:any,content:any){
  this.postData=post;
  console.log(post);
  this.modalService.open(content, { size: 'lg' })

   }


 //Publish or reject new posts-----------------------------------------------------------------------
 update(id: any, value: string){
  const formData = new FormData();
  formData.set('status', value);
  this.post.updateStatus(id, formData).subscribe(
    (res) => {
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Post has been ${value}.`,
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 0);
        });
      }
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

 //delete post---------------------------------------------------------------------------------------
 delete(id: any) {
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
       this.post.deletePost(id).subscribe(
         (res) => {
           Swal.fire({
             position: 'center',
             icon: 'success',
             title: 'Your post has been deleted.',
             showConfirmButton: false,
             timer: 3000,
           }).then(() => {
             setTimeout(() => {
               window.location.reload();
             }, 0);
           });
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
