import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class FirebaseService {
  constructor(public http: Http, public db: AngularFireDatabase) {
  }
}
