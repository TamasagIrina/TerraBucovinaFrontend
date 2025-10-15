import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 signup = false; 

}
