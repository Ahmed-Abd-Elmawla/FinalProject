import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home2card',
  templateUrl: './home2card.component.html',
  styleUrls: ['./home2card.component.css']
})
export class Home2cardComponent {
  @Input() oneOfCards!: Card;

  constructor(private router: Router) {}

  goToCardDetails(cardId: number) {
    this.router.navigate(['home2card-details', cardId]);
  }
 
}
