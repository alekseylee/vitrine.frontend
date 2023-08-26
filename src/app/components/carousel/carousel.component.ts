import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  carouselSlides = [
    {
        imageSrc: './assets/img/banner_img_01.jpg',
        alt: 'Slide 1',
        caption: 'Slide 1 Caption'
    },
    {
        imageSrc: './assets/img/banner_img_02.jpg',
        alt: 'Slide 2',
        caption: 'Slide 2 Caption'
    },
    {
        imageSrc: '.assets/static/images/promo/25-Nike.PROMO-Code.png',
        alt: 'Slide 3',
        caption: 'Slide 3 Caption'
    }
];

}
