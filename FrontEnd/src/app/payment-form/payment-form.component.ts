

import { Component, ViewChild, ElementRef } from '@angular/core';

import { Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {

  stripe = Stripe('pk_test_51MKiaiAKCs7rV1K1osHQXFDoYC6TDT1uEPp6TIcWLFMzKV4dv4geHaOOk7aPgFZkWAzkR02Ecyjhiu5LrGk1mgWO00c3PiUAec');
  card: any;
  cardErrors: any;
  amount !: number;

  @ViewChild('cardElement', { static: true }) cardElement!: ElementRef;

// ngOnInit() {
//   this.stripe = Stripe('pk_test_51MKiaiAKCs7rV1K1osHQXFDoYC6TDT1uEPp6TIcWLFMzKV4dv4geHaOOk7aPgFZkWAzkR02Ecyjhiu5LrGk1mgWO00c3PiUAec');
// }

createCardElement() {
  this.card = this.stripe.elements().create('card');
  this.card.mount(this.cardElement.nativeElement);
}

ngAfterViewInit() {
  this.createCardElement();
}


onSubmit() {
  this.stripe.createToken(this.card).then((result) => {
    if (result.error) {
      this.cardErrors = result.error.message;
    } else {
      // Send the token to your server to process the payment
    }
  });
}

}
