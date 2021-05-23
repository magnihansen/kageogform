import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { Content } from '../../interfaces/content';

@Component({
  selector: 'app-othersservice',
  templateUrl: './othersservice.component.html',
  styleUrls: ['./othersservice.component.css']
})
export class OthersserviceComponent {
  private dbPath = '/contents';
  cakes: Content[] = [];

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase, private contentService: ContentService) {
    this.cakes = [];
    this.db.list(this.dbPath, ref => ref.orderByChild('contenttype').equalTo('3'))
    .valueChanges().subscribe(snapshots => {
      this.cakes = (snapshots as Content[]).sort((a: Content, b: Content) => {
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
