import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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

    this.Register=this.fbuilder.group({
      name:['',[Validators.required ,Validators.minLength(6)]],
      number:['',[Validators.required ,Validators.minLength(10)]],
      id:['',[Validators.required ,Validators.minLength(14)]],
      image:['',[Validators.required ]],

      email:['',[Validators.required , Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmpassword:['',[Validators.required]]
    })

  }

  uploadImage(event:any){

      this.file = event.target.files[0];
      
  }

  registerUser(){

    const formdata=new FormData();
    formdata.append('name',this.Register.get('name')?.value);
    formdata.append('number',this.Register.get('number')?.value);
    formdata.append('id',this.Register.get('id')?.value);
    formdata.append('image',this.file);
    formdata.append('email',this.Register.get('email')?.value);
    formdata.append('password',this.Register.get('password')?.value);
    formdata.append('confirmpassword',this.Register.get('confirmpassword')?.value);

    console.log(formdata.get('name'));

      this.userserv.register(formdata).subscribe((result:any)=>{
        this.user=result.message;
        if( result.name != null){
           this.image=result;
          console.log(result);
          
          // this.router.navigate(['']);
          this.message='Your data is Registerd we will send you email when your data is virified thank you'
         
        }
        
      })
    

  }

}
