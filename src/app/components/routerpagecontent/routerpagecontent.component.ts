import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { Content } from '../../interfaces/content';

@Component({
  selector: 'app-routerpagecontent',
  templateUrl: './routerpagecontent.component.html',
  styleUrls: ['./routerpagecontent.component.css']
})
export class RouterpagecontentComponent {
  content: string;
  contents: Content[];

  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthService, private af: AngularFireDatabase) {
      this.loadPage(this.route.routeConfig.path);
    }
  loadPage(url: string) {
    this.af.list('/pages', ref => ref.orderByChild('link').equalTo(url)).valueChanges().subscribe(snapshots => {
      this.contents = snapshots as Content[];
      if (this.contents.length === 1) {
        this.content = this.contents[0].content;
      }
    });
  }
}
