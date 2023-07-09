

import { Component } from "@angular/core"


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent{
 
   
  constructor() { }
  
  handler:any = null;
  ngOnInit() {
 
    this.loadStripe();
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
    });
 
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