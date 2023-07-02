import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    const formdata=new FormData();
  
    formdata.append('email',this.login.get('email')?.value);
    formdata.append('password',this.login.get('password')?.value);
   

        
    this.userserv.login(formdata).subscribe((result:any)=>{
        console.log(result.email);
         localStorage.setItem('user',JSON.stringify(result));
        if( result.email){
          this.router.navigate(['']);
        }
    });
  }


 }
