import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent {
  firstname: string;
  surname: string;
  phone: string;
  email: string;
  message: string;
  message_status: string;

  constructor(public db: AngularFireDatabase, private authService: AuthService,
    private messageService: MessageService) { }

  onSubmit() {
    if (this.authService.isAuthenticated()) {
      if (this.messageService.create(this.email, this.firstname + ' ' + this.surname, this.phone, this.message)) {
        this.message_status = 'Beskeden sendt.';
        this.firstname = '';
        this.surname = '';
        this.phone = '';
        this.email = '';
        this.message = '';
      } else {
        this.message_status = 'Beskeden forsøgt sendt, men der opstod en fejl.';
      }
    } else {
      this.message_status = 'Beskeden kunne ikke sendes.';
    }
  }
}
