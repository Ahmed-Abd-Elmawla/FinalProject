import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imageUrl: string = 'assets/images/f-black.jpg';


  showResults = false;
  searched: any;
  searchTerm!: string;
  flagValue!: any;

  constructor(

    private req: PostsService,

  ) {}



  search(col: any, pattern: any) {
    console.log(col, pattern);
this.req.search(col,pattern).subscribe((res: any) => {(this.searched = res),console.log(res[0].id);
});
  }
  blur() {
    this.searched = '';
  }
}
