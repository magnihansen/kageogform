import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AuthService } from '../services/auth.service';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private dbPath = '/messages';
  messages: AngularFireList<Message> = null;
  newMessage: Message = null;

  constructor(public db: AngularFireDatabase, private authService: AuthService) {
    this.messages = this.getList();
  }

  get(uid: string): AngularFireObject<Message> {
    return this.db.object(this.dbPath + '/' + uid);
  }

  getByValue(email: string): any { /* deferred */
    this.db.list(this.dbPath, ref => ref.orderByChild('email').equalTo(email))
    .valueChanges().subscribe(snapshots => {
      const c_list: Message[] = (snapshots as Message[]);
      if (typeof c_list[0] !== 'undefined') {
        return c_list[0] as Message;
      } else {
        return this.newMessage;
      }
    });
  }

  create(email: string, name: string, phone: string, message: string): boolean {
    if (this.authService.isAuthenticated()) {
      const now = new Date();
      this.newMessage = {
        uid: '',
        timestamp: now.toString(),
        done: false,
        email: email,
        message: message,
        name: name,
        phone: phone
      };
      const uid = this.db.list(this.dbPath).push(this.newMessage).key;
      this.newMessage.uid = uid;
      this.update(uid, this.newMessage);
      // this.messages.push(this.newMessage).then(msg => this.handleSuccess(msg));
      return true;
    }
    return false;
  }

  update(key: string, c: Message): void {
    const now = new Date();
    this.db.object<Message>(this.dbPath + '/' + c.uid).update({
      uid: c.uid,
      timestamp: now.toDateString(),
      done: c.done,
      email: c.email,
      message: c.message,
      name: c.name,
      phone: c.phone
    })
    .then(msg => this.handleSuccess(msg))
    .catch(error => this.handleError(error));
  }

  delete(uid: string): void {
    const pagesRef = this.db.object(this.dbPath + '/' + uid);
    pagesRef.remove();
  }

  getList(): AngularFireList<Message> {
    return this.db.list(this.dbPath);
  }

  deleteAll(): void {
    this.messages.remove().catch(error => this.handleError(error));
  }

  private handleSuccess(msg) {
    // console.log(msg);
  }

  private handleError(error) {
    // console.log(error);
  }
}
