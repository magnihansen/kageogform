import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../../services/auth.service';
import { ContentService } from '../../../services/content.service';
import { ContenttypeService } from '../../../services/contenttype.service';
import { Content } from '../../../interfaces/content';
import { Contenttype } from '../../../interfaces/contenttype';
import { Contentextended } from '../../../interfaces/contentextended';
import { Message } from '../../../interfaces/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dbPath = '/contents';
  contents: Content[];
  contentExtendeds: Contentextended[] = [];
  contentExtended: Contentextended;
  newContent: Content;
  contenttypes: Contenttype[];
  messages: Message[] = null;
  guid = '';
  showAddContent = false;
  showAddType = false;
  currentContenttypeValue = 0;
  newsubject = '';
  ranknumbers: number[];
  contentname = '';
  contentlink = '';
  newcontenttext = '';
  contentrank = 1;
  contenttype = 1;
  typename = '';
  typevalue = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private af: AngularFireDatabase,
    private contentService: ContentService,
    private contenttypeService: ContenttypeService
  ) {
      this.contenttypes = [];
      this.contents = [];
      this.ranknumbers = Array(99).fill(0).map((x, i) => i + 1);
  }

  ngOnInit() {
    this.af.list('/contenttypes', ref => ref.orderByChild('value')).valueChanges().subscribe(snapshots => {
      this.contenttypes = snapshots as Contenttype[];
    });

    this.af.list(this.dbPath, ref => ref.orderByChild('contenttype')).valueChanges().subscribe(snapshots => {
      this.contents = [];
      this.contents = snapshots as Content[];
      this.contentExtendeds = [];
      this.contents.forEach(c => {
        const ct_name = this.contenttypes.find(ref => parseInt(ref.value.toString(), 10) === parseInt(c.contenttype.toString(), 10));
        const cte: Contentextended = {
          contenttypename: ct_name.name,
          uid: c.uid,
          rank: c.rank,
          contenttype: c.contenttype,
          title: c.title,
          link: c.link,
          content: c.content,
          active: c.active,
          created: c.created,
          lastmodified: c.lastmodified
        };
        this.contentExtendeds.push(cte);
      });
    });

    this.af.list('/messages', ref => ref.orderByChild('timestamp')).valueChanges().subscribe(snapshots => {
      this.messages = snapshots as Message[];
    });
  }

  toggleAddNewContent() {
    this.contentname = '';
    this.contentlink = '';
    this.newcontenttext = '';
    this.contentrank = 1;
    this.contenttype = 1;
    this.showAddContent = !this.showAddContent;
    if (this.showAddType) {
      this.showAddType = false;
    }
  }
  toggleAddNewType() {
    this.typename = '';
    this.typevalue = 0;
    this.showAddType = !this.showAddType;
    if (this.showAddContent) {
      this.showAddContent = false;
    }
  }
  isNewType(contenttypevalue: number): boolean {
    if (contenttypevalue !== this.currentContenttypeValue) {
      this.currentContenttypeValue = contenttypevalue;
      return true;
    } else {
      return false;
    }
  }
  getContenttypeName(value: number): string {
    this.af.list('/contenttypes', ref => ref.orderByChild('value')).valueChanges().subscribe(snapshots => {
      this.contenttypes = [];
      this.contenttypes = snapshots as Contenttype[];
      this.contenttypes.forEach(ct => {
        if (ct.value === value) {
          return ct.name;
        }
      });
    });
    return 'NaN';
  }

  addContent() {
    this.contentService.create(this.contentrank, this.contenttype, this.contentname, this.contentlink, this.newcontenttext, true);
  }
  addType() {
    this.typevalue = this.contenttypes[this.contenttypes.length - 1].value + 1;
    this.contenttypeService.create(this.typename, this.typevalue);
    this.showAddType = false;
    alert('Indholdstypen ' + this.typename + ' er oprettet');
  }

  removeContent(thisContent: Content) {
    if (confirm('Er du sikker du slette ' + thisContent.title + ' og dets indhold?')) {
      this.contentService.delete(thisContent.uid);
    }
  }
  removeType(thisContenttype: Contenttype) {
    if (confirm('Er du sikker du slette ' + thisContenttype.name + '?')) {
      this.contenttypeService.delete(thisContenttype.uid);
    }
  }
}
