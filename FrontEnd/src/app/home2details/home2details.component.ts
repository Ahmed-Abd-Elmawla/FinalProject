import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Card} from '../../app/Model/card'


@Component({
  selector: 'app-home2details',
  templateUrl: './home2details.component.html',
  styleUrls: ['./home2details.component.css']
})
export class Home2detailsComponent implements OnInit {
  card: Card | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cardId = +params['id']; // Get the 'id' parameter from the route
      this.card = this.cards.find(card => card.id === cardId);
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
}

 
