import { Component, Input } from '@angular/core';
import {Card} from '../../app/Model/card'
import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-home2card',
  templateUrl: './home2card.component.html',
  styleUrls: ['./home2card.component.css']
})
export class Home2cardComponent {
  @Input() card!: any;


  

}
