import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { AuthService } from '../services/auth.service';
import { Content } from '../interfaces/content';

@Injectable()
export class ContentService {
  private dbPath = '/contents';
  contents: AngularFireList<Content> = null;
  newContent: Content;

  constructor(public db: AngularFireDatabase, private authService: AuthService) {}

  get(uid: string): AngularFireObject<Content> {
    return this.db.object(this.dbPath + '/' + uid);
  }

  create(rank: number, contenttype: number, title: string, link: string, content: string, active: boolean): void {
    if (this.authService.isAuthenticated()) {
      this.newContent = {
        uid: '',
        rank: rank,
        contenttype: contenttype,
        title: title,
        link: link,
        content: content,
        active: active,
        created: new Date(),
        lastmodified: null
      };
      const uid = this.db.list(this.dbPath).push(this.newContent).key;
      this.newContent.uid = uid;
      this.update(uid, this.newContent);
      this.contents.push(this.newContent).then(msg => this.handleSuccess(msg));
    }
  }

  update(key: string, content: Content): void {
    this.db.object<Content>(this.dbPath + '/' + content.uid).update({
      uid: content.uid,
      title: content.title,
      link: content.link,
      content: content.content,
      lastmodified: new Date()
    })
    .then(msg => this.handleSuccess(msg))
    .catch(error => this.handleError(error));
  }

  delete(uid: string): void {
    const pagesRef = this.db.object(this.dbPath + '/' + uid);
    pagesRef.remove();
  }

  getList(): AngularFireList<Content> {
    this.contents = this.db.list(this.dbPath);
    return this.contents;
  }

  deleteAll(): void {
    this.contents.remove().catch(error => this.handleError(error));
  }

  private handleSuccess(msg) {
    console.log(msg);
  }

  private handleError(error) {
    console.log(error);
  }

}
