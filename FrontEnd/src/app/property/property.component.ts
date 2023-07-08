import { Component,EventEmitter,Input,Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Property} from '../interfaces/property'
import { PostsService } from '../services/posts.service';
import { CategoriesService } from '../services/categories.service';
import { Card } from '../Model/card';
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent {
  @Input() propertyItem !: Property;
  card!: Card;
  categories!:any;
  category!: any;
  @Output() emitFromChild = new EventEmitter()
  router: any;
  constructor(private  activatedRoute: ActivatedRoute, private req:CategoriesService,private  CategoriesService : CategoriesService){}
  ngOnInit() {
    this.req
    .getCategory(this.activatedRoute.snapshot.params['id'])
    .subscribe((res: any) => {
      console.log(res);
      this.card = res;

    });
  }
  //REDIRECT TO post DETAILS PAGE
  redirectDetails(id : any)
  {console.log(id);
    this.router.navigate(['post-details',id])
}

}
