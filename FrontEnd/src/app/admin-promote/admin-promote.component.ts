import { Component } from '@angular/core';
import user from 'pusher-js/types/src/core/user';
import Swal from 'sweetalert2';
import { ContactService } from '../services/contact.service';
import { PromoteService } from '../services/promote.service';

@Component({
  selector: 'app-admin-promote',
  templateUrl: './admin-promote.component.html',
  styleUrls: ['./admin-promote.component.css']
})
export class AdminPromoteComponent {
  postData!:any;
  allPosts!: any;
  dataStored!: any;

  constructor(private req:ContactService,private post:PromoteService) {}

ngOnInit(){
  this.dataStored = JSON.parse(localStorage.getItem('user')||'{}') ;
  this.fetchedData();
}

fetchedData(){
  this.post.getAllPosts().subscribe((res: any) => {
    (this.allPosts = res);
  });
}
update(id:any){
  const formData = new FormData();
  formData.append('email',this.dataStored.email);
  formData.set('title', `Congratulation ${this.dataStored.name}`);
  formData.set('subject', 'verification mail');
  formData.set('message', 'your post has been promoted');
  const data={
    "_method":"PUT",
    "status":"verified"
  }

  Swal.fire({
    title: 'Sending email',
    html: 'please wait ...',
    timer: 10000,
    didOpen: () => {
      Swal.showLoading();
      this.req.sendMail(formData).subscribe(
        (res) => {
          Swal.close();
          this.post.updatePro(id, data).subscribe();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'verify Mail sent successfully.',
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
    },
  })
}

delete(id:any){
  const formData = new FormData();
  formData.append('email',this.dataStored.email);
  formData.set('title', `We are sorry ${this.dataStored.name}`);
  formData.set('subject', 'Rejection mail');
  formData.set('message', 'unfortunately your payment for promotion did not completed please try again.');

  Swal.fire({
    title: 'Sending email',
    html: 'please wait ...',
    timer: 10000,
    didOpen: () => {
      Swal.showLoading();
      this.req.sendMail(formData).subscribe(
        (res) => {
          Swal.close();
          this.post.deletePro(id).subscribe();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'reject mail sent successfully.',
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
    },
  })
}

}
