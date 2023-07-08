import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Card} from '../../app/Model/card'
import { Property } from '../interfaces/property';
import { HttpClient } from '@angular/common/http';
import {PostsService} from '../services/posts.service'

@Component({
  selector: 'app-home2details',
  templateUrl: './home2details.component.html',
  styleUrls: ['./home2details.component.css']
})
export class Home2detailsComponent implements OnInit {
  card: Card | undefined;
  properties : Property[] =[];

 propertyItem !: Property;
 
  activatedRoute: any;
 
  handler:any = null;


  constructor(private route: ActivatedRoute,private req: PostsService,private http: HttpClient,private PostsService :PostsService) {}

  ngOnInit() {

    this.loadStripe();


    this.route.params.subscribe(params => {
      const cardId = +params['id']; // Get the 'id' parameter from the route
      // const cardTitle = params['title']; // Get the 'name' parameter from the route
       this.card = this.cards.find(card => card.id === cardId);

       this.req
       .getPostsByCategoryId(this.activatedRoute.snapshot.params['id'])
       .subscribe((res: any) => {
         console.log(res);
         this.propertyItem  = res;
       });
  });


  }

  cards: Card[] = [
    { id: 1, title: 'Apartment', description: 'This is the description for Card 1.', image: 'assets/images/apartment.jpg' },
    { id: 2, title: 'Villa', description: 'This is the description for Card 2.', image: 'assets/images/villa.jpg' },
    { id: 3, title: 'Home', description: 'This is the description for Card 3.', image: 'assets/images/home.jpg' },
    { id: 4, title: 'Garage', description: 'This is the description for Card 4.', image: 'assets/images/garage.jpeg' },
    { id: 5, title: 'Office', description: 'This is the description for Card 5.', image: 'assets/images/office.jpg' },
    { id: 6, title: 'Shop', description: 'This is the description for Card 6.', image: 'assets/images/shop.jpg' },
    { id: 7, title: 'Building', description: 'This is the description for Card 7.', image: 'assets/images/building.jpg' },
    { id: 8, title: 'TwonHouse', description: 'This is the description for Card 8.', image: 'assets/images/twonhouse.jpg' }
  ];




 
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


