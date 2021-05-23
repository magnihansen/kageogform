import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../interfaces/content';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  private dbPath = '/contents';
  contents: Content[] = [];

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private contentService: ContentService) { 
    this.db.list(this.dbPath, ref => ref.orderByChild('contenttype').equalTo('4'))
    .valueChanges().subscribe(snapshots => {
      this.contents = (snapshots as Content[]).sort((a: Content, b: Content) => {
        if (a.rank < b.rank) {
          return -1;
        } else if (a.rank > b.rank) {
          return 1;
        } else {
          return 0;
        }
       });
    });
  }
}
