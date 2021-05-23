import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../../services/auth.service';
import { ContentService } from '../../../services/content.service';
import { Content } from '../../../interfaces/content';

@Component({
  selector: 'app-pageedit',
  templateUrl: './pageedit.component.html',
  styleUrls: ['./pageedit.component.css']
})
export class PageeditComponent implements OnInit  {
  ranknumbers: number[];
  contents: Content[];
  title = '';
  content = '';
  rank: number;
  contentuid = '';
  message_status = '';
  contentobj: Content;

  editorConfig = {
    'editable': true,
    'spellcheck': true,
    'height': '400px',
    'minHeight': '0',
    'width': 'auto',
    'minWidth': '0',
    'translate': 'yes',
    'enableToolbar': true,
    'showToolbar': true,
    'placeholder': 'Enter text here...',
    'toolbar': [
        ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
        ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
        ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
        ['link', 'unlink', 'image'],
        ['code']
    ]
  };

  constructor(private db: AngularFireDatabase,
    private authService: AuthService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => this.loadContent(params['id']));
      this.ranknumbers = Array(99).fill(0).map((x, i) => i + 1);
  }

  ngOnInit() {
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => obj[key]);
  }

  loadContent(uid: string) {
    this.contentuid = uid;
    this.db.object<Content>('/contents/' + uid).valueChanges().subscribe(o => {
      if (o != null) {
        this.contentobj = o;
        this.title = o.title;
        this.rank = o.rank;
        this.content = o.content.replace('\n', '<br />');
      }
    });
  }

  gotoDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  onSubmit() {
    if (this.authService.isAuthenticated()) {
      this.contentobj.content = this.content;
      this.contentobj.title = this.title;
      this.contentService.update(this.contentobj.uid, this.contentobj);

      this.message_status = 'Teksten gemt';
    } else {
      this.message_status = 'Teksten ikke gemt!';
    }
  }
}
