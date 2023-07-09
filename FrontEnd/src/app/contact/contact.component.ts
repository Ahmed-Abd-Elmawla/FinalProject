import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {




  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.fb.group({
      first_name: ['',[ Validators.required,Validators.minLength(3)]],
      last_name: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.contactForm.controls; }

  get first_name() { return this.contactForm.get('first_name'); }
  get last_name() { return this.contactForm.get('last_name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }



onSubmit() {
  //console.log(this.contactForm.value);
    this.http.post('http://127.0.0.1:8000/api/contacts', this.contactForm.value).subscribe({
      next: (response) => {
        console.log(response);
        alert('Message sent successfully!');
        this.contactForm.reset();
      },
      error: (error) => {
        console.error(error);
        alert('An error occurred while sending the message. Please try again later.');
      }
    });
  }
}




