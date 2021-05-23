import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../interfaces/content';
// https://github.com/leo6104/ngx-slick-carousel

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  private dbPath = '/contents';
  href = '';
  slides: Content[] = [];
  slideConfig = {
    slidesToShow: 1,
    slidesToScrol: 1,
    prevArrow: '<i class="fa fa-chevron-left slick-prev"></i>',
    nextArrow: '<i class="fa fa-chevron-right slick-next"></i>',
    swipeToSlide: true
  };

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private contentService: ContentService) {
    this.href = this.route.snapshot.url.toString();
    this.db.list(this.dbPath, ref => ref.orderByChild('contenttype').equalTo('1'))
    .valueChanges().subscribe(snapshots => {
      this.slides = (snapshots as Content[]).sort((a: Content, b: Content) => {
        if (a.rank < b.rank) {
          return -1;
        } else if (a.rank > b.rank) {
          return 1;
        } else {
          return 0;
        }
       });
      this.slickInit(event);
    });
  }

  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }
}
