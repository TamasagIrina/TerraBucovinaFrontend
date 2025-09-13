import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-favorite-dropdown',
  imports: [
    MatIconModule
  ],
  templateUrl: './favorite-dropdown.component.html',
  styleUrl: './favorite-dropdown.component.scss'
})
export class FavoriteDropdownComponent {
 constructor(private close: NavbarComponent){}

 closeFavorite(){
  this.close.closeFavorite()
 }
}
