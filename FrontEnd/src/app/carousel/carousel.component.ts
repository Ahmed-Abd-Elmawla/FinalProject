import { Component,Input } from '@angular/core';

import { HttpClient } from '@angular/common/http';
//import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

interface Image {
  url: string;
  // other properties
}
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  template: `
  <div class="image-gallery">
    <div class="image-gallery-item" *ngFor="let image of propertyItem.images">
      <img [src]="http://localhost:8000/post_images/{{ image }}" alt="Image">
    </div>
  </div>
`

})
export class CarouselComponent {
  // @Input() images: string[] = [];
  images: Image[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Image[]>('http://example.com/images').subscribe(images => {
      this.images = images;
    });
  }
}
