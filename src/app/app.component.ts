import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { Store } from '@ngrx/store';
import { ProductsActions } from './components/core/store/products/products.actions';
import { ImagesActions } from './components/core/store/images/images.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'terraBucovinaSite';

  constructor(public store: Store) {

  }


  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProducts());
    this.store.dispatch(ImagesActions.loadAllImages());
    
  }

}
