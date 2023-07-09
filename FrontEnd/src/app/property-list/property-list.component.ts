import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PostsService} from '../services/posts.service'
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
  itemsPerPage:number= 6
  stat = "published"
  constructor(public router: Router,private PostsService :PostsService ){}
  ngOnInit(){

    this.PostsService.getPostsByStatus(this.stat).subscribe((res:any)=>{
      this.properties = res;
      this.totalLength=res.length;
      console.log(res);
      console.log(this.properties)
      // this.totalLength =res.response.length;

      });
}}

