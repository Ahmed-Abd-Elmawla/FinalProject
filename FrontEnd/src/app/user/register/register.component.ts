import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  Register!:FormGroup;

  user:any;

  message:any

  file:any;

  image:any;

  constructor(private userserv:UserService , private fbuilder:FormBuilder , private router:Router){
    const coverValidator = [Validators.required, this.coverValidatorFn];
    const imagesValidator = [Validators.required, this.imagesValidatorFn];
    this.Register=this.fbuilder.group({
      name:['',[Validators.required ,Validators.minLength(6)]],
      number:['',[Validators.required ,Validators.minLength(10)]],
      id:['',[Validators.required ,Validators.minLength(14)]],
      image:['',imagesValidator],
     cover:['',coverValidator],
      email:['',[Validators.required , Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmpassword:['',[Validators.required]]
    })
        //make all input fields touched to show errors after the form load
        Object.values(this.Register.controls).forEach((control) => {
          control.markAsTouched();
        });

  }

  // uploadImage(event:any){
  //     this.file = event.target.files[0];
  // }

  registerUser(){

    const formdata=new FormData();
    const input = document.querySelector('input[id="images"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        formdata.append('images[]', files[i], files[i].name);
      }
    }

    const input2 = document.querySelector('input[id="cover"]');
    if (input2 instanceof HTMLInputElement && input2.files) {
      const files = input2.files;
        formdata.append('cover', files[0], files[0].name);
    }

    formdata.append('name',this.Register.get('name')?.value);
    formdata.append('number',this.Register.get('number')?.value);
    formdata.append('id',this.Register.get('id')?.value);
    formdata.append('image',this.file);
    formdata.append('email',this.Register.get('email')?.value);
    formdata.append('password',this.Register.get('password')?.value);
    formdata.append('confirmpassword',this.Register.get('confirmpassword')?.value);

    console.log(formdata.get('name'));

      this.userserv.register(formdata).subscribe(
        (res) => {
          {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Thanks for register we will mail your when verify your information.',
              showConfirmButton: false,
              timer: 5000,
            }).then(() => {
              setTimeout(() => {
                window.location.href='';
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

    //custom validator for cover
    coverValidatorFn(control: AbstractControl): ValidationErrors | null {
      const input = document.querySelector('input[id="cover"]');
      if (input instanceof HTMLInputElement && input.files) {
        const files = input.files;
        if (files.length < 1) {
          return { fileCount: true };
        }
      }
      return null;
    }

        //custom validator for images
        imagesValidatorFn(control: AbstractControl): ValidationErrors | null {
          const input = document.querySelector('input[id="images"]');
          if (input instanceof HTMLInputElement && input.files) {
            const files = input.files;
            if (files.length < 2) {
              return { fileCount: true };
            }
          }
          return null;
        }
}
