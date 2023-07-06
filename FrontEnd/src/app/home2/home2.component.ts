
import { Component } from '@angular/core';
import { Card } from '../Model/card';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component {

  cards!:any;

  constructor(
    private req:CategoriesService
  ) {
  }

  ngOnInit() {
    this.req.getAllCategories().subscribe((res: any) => {
      (this.cards = res);
    });
  }
}

