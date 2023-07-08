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
  card!: Card;
  propertyItem !: any;


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
  }



