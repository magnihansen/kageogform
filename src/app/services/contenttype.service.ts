import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { AuthService } from '../services/auth.service';
import { Contenttype } from '../interfaces/contenttype';

@Injectable({
  providedIn: 'root'
})
export class ContenttypeService {
  private dbPath = '/contenttypes';
  contenttypes: AngularFireList<Contenttype> = null;
  newContenttype: Contenttype = null;

  constructor(
    public db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.contenttypes = this.getList();
  }

  get(uid: string): AngularFireObject<Contenttype> {
    return this.db.object(this.dbPath + '/' + uid);
  }

  getByValue(ct_value: number): any {
    this.db.list(this.dbPath, ref => ref.orderByChild('value').equalTo(parseInt(ct_value.toString(), 10)))
    .valueChanges().subscribe(snapshots => {
      const cts: Contenttype[] = (snapshots as Contenttype[]);
      if (typeof cts[0] !== 'undefined') {
        return cts[0].name;
      } else {
        return '';
      }
    });
  }

  create(name: string, value: number): void {
    if (this.authService.isAuthenticated()) {
      this.newContenttype = {
        uid: '',
        name: name,
        value: value
      };
      const uid = this.db.list(this.dbPath).push(this.newContenttype).key;
      this.newContenttype.uid = uid;
      this.update(uid, this.newContenttype);
    }
  }

  update(key: string, ct: Contenttype): void {
    this.db.object<Contenttype>(this.dbPath + '/' + ct.uid).update({
      uid: ct.uid,
      name: ct.name,
      value: ct.value
    })
    .then(msg => this.handleSuccess(msg))
    .catch(error => this.handleError(error));
  }

  delete(uid: string): void {
    const pagesRef = this.db.object(this.dbPath + '/' + uid);
    pagesRef.remove();
  }

  getList(): AngularFireList<Contenttype> {
    return this.db.list(this.dbPath);
  }

  deleteAll(): void {
    this.contenttypes.remove().catch(error => this.handleError(error));
  }

  private handleSuccess(msg) {
    console.log(msg);
  }

  private handleError(error) {
    console.log(error);
  }

}
