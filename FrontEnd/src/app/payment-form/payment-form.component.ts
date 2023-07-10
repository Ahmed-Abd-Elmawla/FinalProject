

import { Component, ViewChild, ElementRef, Input } from '@angular/core';

import { Stripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { PostsService } from '../services/posts.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {

  @Input() item!: any;
  handler:any = null;
  dataStored!: any;

constructor(private post:PostsService,private req:ContactService) {
  this.dataStored = JSON.parse(localStorage.getItem('user')||'{}') ;

}
  pay(amount: any) {

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MKiaiAKCs7rV1K1osHQXFDoYC6TDT1uEPp6TIcWLFMzKV4dv4geHaOOk7aPgFZkWAzkR02Ecyjhiu5LrGk1mgWO00c3PiUAec',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)

      }
    });

    handler.open({
      name: 'Demo Site',
      amount: amount * 100
    });setTimeout(() => {
      const formData = new FormData();
      formData.set('_method', 'PUT');
      formData.set('status', 'stopped');


      const data = new FormData();
      data.append('email',this.dataStored.email);
      data.set('title', `Thanks ${this.dataStored.name} for choosing us`);
      data.set('subject', 'information mail');
      data.set('message', `owner name is ${this.item.user.name}\n
      phone number ${this.item.user.number}\n
      email ${this.item.user.email}\n
      personal Id number ${this.item.user.personal_id}\n
      contact him,if you face any problem contact us`);


      Swal.fire({
        title: 'Sending email',
        html: 'please wait ...',
        timer: 10000,
        didOpen: () => {
          Swal.showLoading();
          this.req.sendMail(data).subscribe(
            (res) => {
              Swal.close();
              this.post.updatePost(this.item.id, formData).subscribe()
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'verify Mail sent successfully.',
                showConfirmButton: false,
                timer: 3000,
              }).then(() => {
                setTimeout(() => {
                  window.location.href='Dashboard';
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
    }, 15000);

  }

  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MKiaiAKCs7rV1K1osHQXFDoYC6TDT1uEPp6TIcWLFMzKV4dv4geHaOOk7aPgFZkWAzkR02Ecyjhiu5LrGk1mgWO00c3PiUAec',
          locale: 'auto',
          token: function (token: any) {

            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }


}
