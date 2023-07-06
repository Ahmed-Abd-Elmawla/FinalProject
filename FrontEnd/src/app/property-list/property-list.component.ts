import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PropertyListService} from '../services/property-list.service'
import {Property} from '../interfaces/property'
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  properties : Property[] =[]
  totalLength:any;
  p:number=1;
  itemsPerPage:number= 3
  constructor(public router: Router,private PropertyListService :PropertyListService ){}
  ngOnInit(){

      this.PropertyListService.getAllPosts().subscribe((res:any)=>{
      this.properties = res;
      this.totalLength=res.length;
      console.log(res);
      console.log(this.properties)
      // this.totalLength =res.response.length;

      });
}}

