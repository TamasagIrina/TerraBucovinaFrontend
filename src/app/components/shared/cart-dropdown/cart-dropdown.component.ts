import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cart-dropdown',
  imports: [RouterModule],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.scss'
})
export class CartDropdownComponent {
 constructor( private close: NavbarComponent){}

 closeCart(){
  this.close.closeCart()
 }
}
