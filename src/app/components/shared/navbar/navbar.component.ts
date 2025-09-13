import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CartDropdownComponent } from "../cart-dropdown/cart-dropdown.component";
import { CommonModule } from '@angular/common';
import { MatBadge } from '@angular/material/badge';
import { FavoriteDropdownComponent } from "../favorite-dropdown/favorite-dropdown.component";


@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule,
    CartDropdownComponent,
    CommonModule,
    MatBadge,
    FavoriteDropdownComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    public isCartOpen = false;
    public isFavoriteOpen = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    this.closeFavorite();

  }

   toggleFavorite() {
    this.isFavoriteOpen = !this.isFavoriteOpen;
    this.closeCart();
  
  }
   closeFavorite() {
    this.isFavoriteOpen = false;
  }

  closeCart() {
    this.isCartOpen = false;
  }
}
