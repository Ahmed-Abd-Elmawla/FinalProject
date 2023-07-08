import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserData } from '../Model/user-data';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  //global variables ---------------------------------------------------------------------------------
  user!: UserData;
  form!: FormGroup;
  //update info form
  name: any;
  password: any;
  email: any;
  userInfo!:any;
  constructor(
    private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private req : UserService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '[]');
    this.req.getUserById(this.user.id).subscribe((res: any) => {
      (this.userInfo = res);
    });
    this.form = this.fb.group({
      password: new FormControl(),
      email: [
        '',
        [
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      name: ['', [Validators.required, Validators.minLength(15)]],
    });
        //make all input fields touched to show errors after the form load
        Object.values(this.form.controls).forEach((control) => {
          control.markAsTouched();
        });
  }

  open(content: any) {
    this.name = this.userInfo.name;
    this.email = this.userInfo.email;
    this.modalService.open(content);
  }
  ele!:any;
  //update user info--------------------------------------------------------------------------------------------------
  updateInfo(pass:any) {
    const data = new FormData();
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      if(files.length>0){
        data.append('cover', files[0], files[0].name);
    }}

    
    if(pass.length>0){
      data.set("password",pass);
    }
    data.set("name",this.name);
    data.set("email",this.email);
        this.req.updateUser(this.user.id,data).subscribe(
          (res) => {
            {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your data has been updated.',
                showConfirmButton: false,
                timer: 3000,
              }).then(() => {
                setTimeout(() => {
                  // window.location.reload();
                }, 0);
              });
            }
          },
          (err) => {
            if (err)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:err.error.message,
              }),
                console.error(err);
          }
        );
  }
}
