import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { ContactService } from '../services/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-pending-u',
  templateUrl: './admin-pending-u.component.html',
  styleUrls: ['./admin-pending-u.component.css']
})
export class AdminPendingUComponent {

//global variables -------------------------------------------------------------------------------------------------
 allUsers!: any;
 userData!:any;
 imageArray!:any;

 constructor(private user: UserService,private req:ContactService,private modalService: NgbModal) {}

ngOnInit() {
  this.user.getUsersByStatus('pending').subscribe((res: any) => {
    (this.allUsers = res);
  });
}
//view user data to verify or reject--------------------------------------------------------------------------------
 view(user:any,content:any){
this.userData=user;
this.imageArray = JSON.parse(user.images)
console.log(user);
this.modalService.open(content, { size: 'lg' })

 }

//admin verify user and send verify email---------------------------------------------------------------------------
update(user:any){
  const formData = new FormData();
  formData.append('email',user.email);
  formData.set('title', `Congratulation ${user.name}`);
  formData.set('subject', 'verification mail');
  formData.set('message', 'your account has been verified you can do any thing now. \n thanks for joining us.');
  const data={
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
          this.user.updateUser(user.id, data).subscribe();
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
//admin reject user and delete account------------------------------------------------------------------------------
 delete(user:any){
  const formData = new FormData();
  formData.append('email',user.email);
  formData.set('title', `We are sorry ${user.name}`);
  formData.set('subject', 'Rejection mail');
  formData.set('message', 'unfortunately your account had been rejected due to incomplete data, try to register again.');

  Swal.fire({
    title: 'Sending email',
    html: 'please wait ...',
    timer: 10000,
    didOpen: () => {
      Swal.showLoading();
      this.req.sendMail(formData).subscribe(
        (res) => {
          Swal.close();
          this.user.deleteUser(user.id).subscribe();
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
