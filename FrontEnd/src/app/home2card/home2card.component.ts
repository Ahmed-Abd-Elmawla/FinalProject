import { Component, Input } from '@angular/core';
import {Card} from '../../app/Model/card'


@Component({
  selector: 'app-home2card',
  templateUrl: './home2card.component.html',
  styleUrls: ['./home2card.component.css']
})
export class Home2cardComponent {
  @Input() oneOfCards!: Card;
}
