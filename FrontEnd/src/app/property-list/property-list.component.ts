import { Component } from '@angular/core';
import { Property } from '../interfaces/property';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  properties :Property []=[
    {
      "_id":1 ,
      "price":12.345 ,
      "description":"Golden Urban House For Sell",
      "category":"Home",
      "address":"123 Street, New York, USA",
      "avatar":"../../assets/images/property-2.jpg"
    },
    {
      "_id":2 ,
      "price":15.345 ,
      "description":"Golden Urban House For Sell",
      "category":"Appartment",
      "address":"123 Street, New York, USA",
      "avatar":"../../assets/images/property-1.jpg"
    },
    {
      "_id":3 ,
      "price":15.345 ,
      "description":"Golden Urban House For Sell",
      "category":"Villa",
      "address":"123 Street, New York, USA",
      "avatar":"../../assets/images/property-6.jpg"
    },
  ]
}
