import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Card} from '../../app/Model/card'
import { Property } from '../interfaces/property';
import { HttpClient } from '@angular/common/http';
import { CategoriesService} from '../services/categories.service'
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-home2details',
  templateUrl: './home2details.component.html',
  styleUrls: ['./home2details.component.css']
})
export class Home2detailsComponent implements OnInit {
  card!: any;
  propertyItem !: any;
  handler:any = null;

  constructor(private  activatedRoute: ActivatedRoute,
    private req: CategoriesService,
    private request: PostsService,
    private http: HttpClient,
    private  CategoriesService : CategoriesService) {}

  ngOnInit() {
    this.req
    .getCategory(this.activatedRoute.snapshot.params['id'])
    .subscribe((res: any) => {
      console.log(res);
      this.card = res;

    });
  // getPostsByCategoryId
  this.request
  .getPostsByCategoryId(this.activatedRoute.snapshot.params['id'])
  .subscribe((res: any) => {
    console.log(res);
    this.propertyItem = res;

  });
  }


  // pay(amount: any) {

  //   var handler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_51MKiaiAKCs7rV1K1osHQXFDoYC6TDT1uEPp6TIcWLFMzKV4dv4geHaOOk7aPgFZkWAzkR02Ecyjhiu5LrGk1mgWO00c3PiUAec',
  //     locale: 'auto',
  //     token: function (token: any) {
  //       // You can access the token ID with `token.id`.
  //       // Get the token ID to your server-side code for use.
  //       console.log(token)

  //     }
  //   });

  //   handler.open({
  //     name: 'Demo Site',

  //     amount: amount * 100
  //   });

  // }

  // loadStripe() {

  //   if(!window.document.getElementById('stripe-script')) {
  //     var s = window.document.createElement("script");
  //     s.id = "stripe-script";
  //     s.type = "text/javascript";
  //     s.src = "https://checkout.stripe.com/checkout.js";
  //     s.onload = () => {
  //       this.handler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_51MKiaiAKCs7rV1K1osHQXFDoYC6TDT1uEPp6TIcWLFMzKV4dv4geHaOOk7aPgFZkWAzkR02Ecyjhiu5LrGk1mgWO00c3PiUAec',
  //         locale: 'auto',
  //         token: function (token: any) {

  //           console.log(token)
  //           alert('Payment Success!!');
  //         }
  //       });
  //     }

  //     window.document.body.appendChild(s);
  //   }
  // }


  }



