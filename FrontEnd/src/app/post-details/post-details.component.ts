import { Component,EventEmitter,Input,Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PostsService} from '../services/posts.service';
import {Property} from '../interfaces/property';
import { HttpClient } from '@angular/common/http';
import { CommentsService } from '../services/comments.service';
import Swal from 'sweetalert2';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RateService } from '../services/rate.service';
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
 dataStored!: any;

  post: any;
  images: Image[] = [];
reviews!:any;
avgRate!:number;
rates:any;
userRate:any;




  constructor(private  activatedRoute: ActivatedRoute, private req: PostsService,private http: HttpClient,private review:CommentsService,
    private rate:RateService,
    config: NgbRatingConfig){
      config.max = 5;
      config.readonly = true;
    }
  ngOnInit(){
    this.dataStored = JSON.parse(localStorage.getItem('user')||'{}') ;
    this.fetchData();
    console.log(this.dataStored);

  // console.log(this.activatedRoute.snapshot.params['id']);
    this.req
    .getPost(this.activatedRoute.snapshot.params['id'])
    .subscribe((res: any) => {
      console.log(res);
      this.propertyItem  = res[0];

    });



    // this.http.get<Image[]>('http://localhost:8000/post_images/{{ image }}').subscribe(images => {
    //   this.images = images;
    //   console.log(this.images)
    // });


      // const id = this.route.snapshot.paramMap.get('id');
      // console.log(id); // Log the id parameter to the console
      // this.PostsService.getPost(id).subscribe((post: any) => this.post = post);

  }
  fetchData() {
    this.review.getCommentsByPostId(this.activatedRoute.snapshot.params['id']).subscribe((res: any) => {
      console.log(res);
      this.reviews  = res;
    });

    this.rate.getPostRates(this.activatedRoute.snapshot.params['id']).subscribe((res: any) => {
      console.log(res);
      this.rates = res;
      this.avgRate=this.rates.reduce((acc:any, elem:any) => acc + elem.rate_value, 0);
      this.avgRate = this.avgRate / this.rates.length;
      console.log();
    });

    this.rate.getUserRate(this.activatedRoute.snapshot.params['id'],this.dataStored.id).subscribe((res: any) => {
      console.log(res);
      this.userRate  = res;
    });
  }

  addRate(rate: any) {
    console.log(this.dataStored.id);

    if (!this.dataStored.id) {
      {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Login First !!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setTimeout(() => {
            window.location.href = 'Login';
          }, 1000);
        });
      }
    } else {
      const data = {
        user_id: this.dataStored.id,
        post_id: parseInt(this.activatedRoute.snapshot.params['id']),
        owner_id:this.dataStored.id,
        rate_value:rate,
      };
      console.log(data);

      this.rate.addRate(data).subscribe(
          (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'rate has been added.',
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 0);
            });
          },
          (err) => console.error(err)
        );
    }

}
}
