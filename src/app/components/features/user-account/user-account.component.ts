import { Component } from '@angular/core';
import { AuthService } from '../../core/services/authService/auth-sevices.service';
import { User } from '../../core/interfaces/user.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account',
  imports: [CommonModule,
     FormsModule
  ],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent {
  user: User | null = null;

  passwords = {
    current: '',
    newPass: '',
    confirm: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.authService.getUserId().subscribe(userId => {
      if (userId) {
        this.authService.getUserById(+userId).subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  updateUser(form: NgForm) {
    if (!this.user) return;

    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    // VERIFICĂ PAROLA DACĂ USERUL VREA SĂ O SCHIMBE
    if (this.passwords.newPass || this.passwords.confirm) {
      if (this.passwords.newPass !== this.passwords.confirm) {
        alert("Parolele nu coincid!");
        return;
      }

      // TRIMITE PAROLA NOUĂ
      // this.authService.changePassword(this.passwords.current, this.passwords.newPass)
      //   .subscribe({
      //     next: () => console.log("Parola schimbată"),
      //     error: err => console.error(err)
      //   });
    }

    // UPDATE DATE USER
    // this.authService.updateUser(this.user).subscribe({
    //   next: () => {
    //     console.log("User actualizat");
    //     alert("Modificările au fost salvate!");
    //   },
    //   error: err => {
    //     console.error(err);
    //     alert("Eroare la actualizare.");
    //   }
    // });

  }
}
