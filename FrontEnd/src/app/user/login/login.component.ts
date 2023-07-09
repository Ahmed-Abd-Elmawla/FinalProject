import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import user from 'pusher-js/types/src/core/user';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login!: any;
  resetForm!: FormGroup;
  user!: any;

  constructor(
    private userserv: UserService,
    private fbuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private req: ContactService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.login = this.fbuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail.com$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    //------------------------------------------------------------
    this.resetForm = this.fbuilder.group({
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/),
        ],
      ],
      confirmPass: ['', [Validators.required]],
    });
    //make all input fields touched to show errors after the form load
    Object.values(this.resetForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  userLogin() {
    const formdata = new FormData();

    formdata.append('email', this.login.get('email')?.value);
    formdata.append('password', this.login.get('password')?.value);

    this.userserv.login(formdata).subscribe((result: any) => {
      console.log(result);
      if (result.message == false) {
        Swal.fire('No account found', 'please register again', 'error');
      } else if (result.message == true) {
        Swal.fire(
          'Not verified account',
          'we will mail you when verify it',
          'warning'
        );
      } else {
        localStorage.setItem('user', JSON.stringify(result));
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logged in successfully',
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          setTimeout(() => {
            window.location.href = '';
          }, 0);
        });
      }
    });
  }

  reset(content: any) {
    this.modalService.open(content, { centered: true });
  }

  //-----------------------------------------------------------------------------------------
  sendCode(email: any, content: any) {
    Swal.fire({
      title: 'searching',
      html: 'please wait ...',
      timer: 10000,
      didOpen: () => {
        Swal.showLoading();
        this.userserv.findUser(email).subscribe(
          (res: any) => {
            if (res.message == false) {
              Swal.fire(
                'This email not found',
                'please register again',
                'error'
              );
            } else {
              sessionStorage.setItem('email', email);
              Swal.close();
              this.modalService.dismissAll();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Verification code sent successfully.',
                showConfirmButton: false,
                timer: 3000,
              }).then(() => {
                setTimeout(() => {
                  this.modalService.open(content, { centered: true });
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
      },
    });
  }

  checkCode(code: any, content: any) {
    const email = sessionStorage.getItem('email');
    this.userserv.checkCode(email, code).subscribe(
      (res: any) => {
        console.log(res);
        if (res.message == false) {
          Swal.fire('invalid code', '', 'error');
        } else {
          this.modalService.dismissAll();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'code verified',
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            setTimeout(() => {
              this.modalService.open(content, { centered: true });
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

  resetPassword(pass: any) {
    const email = sessionStorage.getItem('email');
    const data = {
      password: pass,
    };
    this.userserv.reset(email, data).subscribe(
      (res) => {
        sessionStorage.removeItem('email');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'password reset successfully.',
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
}
