import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { ContentService } from '../../services/content.service';
import { Content } from '../../interfaces/content';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  articles: Content[] = [];
  private dbPath = '/contents';

  constructor(private router: Router, private authService: AuthService,
    private af: AngularFireDatabase, private contentService: ContentService) {
    }

  ngOnInit() {
    this.af.list(this.dbPath, ref => ref.orderByChild('contenttype').equalTo('5'))
    .valueChanges().subscribe(snapshots => {
      this.articles = (snapshots as Content[]).sort((a: Content, b: Content) => {
        if (a.created < b.created) {
          return -1;
        } else if (a.created > b.created) {
          return 1;
        } else {
          return 0;
        }
       });
    });
  }

}
