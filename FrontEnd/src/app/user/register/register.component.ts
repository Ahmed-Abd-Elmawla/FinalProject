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

  constructor(private userserv:UserService , private fbuilder:FormBuilder , private router:Router){

    this.Register=this.fbuilder.group({
      name:['',[Validators.required ,Validators.minLength(6)]],
      email:['',[Validators.required , Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\.com$')]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmpassword:['',[Validators.required]]
    })

  }

  registerUser(){

    const formdata=new FormData();
    formdata.append('name',this.Register.get('name')?.value);
    formdata.append('email',this.Register.get('email')?.value);
    formdata.append('password',this.Register.get('password')?.value);
    formdata.append('confirmpassword',this.Register.get('confirmpassword')?.value);

    console.log(formdata.get('name'));

      this.userserv.register(formdata).subscribe((result:any)=>{
        this.user=result.message;
        if( result.name != null){
          this.router.navigate(['']);
        }
        
      })
    

  }

}
