import { Component,EventEmitter,Input,Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PostsService} from '../services/posts.service';
import {Property} from '../interfaces/property';
import { HttpClient } from '@angular/common/http';
import { CommentsService } from '../services/comments.service';
// import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgIf } from '@angular/common';

// import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
interface Image {
  url: string;
  // other properties
}
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  // template: `
  //   <div class="image-gallery">
  //     <div class="image-gallery-item" *ngFor="let image of propertyItem.images">
  //       <img [src]="http://localhost:8000/post_images/{{ image }}" alt="Image">
  //     </div>
  //   </div>
  // `


})
  // standalone: true,
  // imports: [NgbCarouselModule, NgIf]
export class PostDetailsComponent {

 propertyItem !: Property;


  post: any;
  images: Image[] = [];
reviews!:any;






  constructor(private  activatedRoute: ActivatedRoute, private req: PostsService,private http: HttpClient,private review:CommentsService){}
  ngOnInit(){
this.fetchData();
  // console.log(this.activatedRoute.snapshot.params['id']);
    this.req
    .getPost(this.activatedRoute.snapshot.params['id'])
    .subscribe((res: any) => {
      console.log(res);
      this.propertyItem  = res;

    });



    this.http.get<Image[]>('http://localhost:8000/post_images/{{ image }}').subscribe(images => {
      this.images = images;
      console.log(this.images)
    });


      // const id = this.route.snapshot.paramMap.get('id');
      // console.log(id); // Log the id parameter to the console
      // this.PostsService.getPost(id).subscribe((post: any) => this.post = post);

  }
  fetchData() {
    this.review.getCommentsByPostId(this.activatedRoute.snapshot.params['id']).subscribe((res: any) => {
      console.log(res);
      this.reviews  = res;

    });
  }


}

