import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login !:any;

 constructor(private userserv:UserService , private fbuilder:FormBuilder , private router:Router){

    this.login=this.fbuilder.group({

      email:['',[Validators.required , Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$') ]],
      password:['',[Validators.required , Validators.minLength(8)]],

    })

  }

  userLogin(){
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


 }
