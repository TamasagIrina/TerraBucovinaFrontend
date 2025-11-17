import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { Store } from '@ngrx/store';
import { ProductsActions } from './components/core/store/products/products.actions';
import { ImagesActions } from './components/core/store/images/images.actions';
import { NotificationComponent } from "./components/shared/notification/notification.component";
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { selectNotification } from './components/core/store/notification/notification.selectors';
import { loadReviews } from './components/core/store/review/review.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NotificationComponent, CommonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'terraBucovinaSite';

  notification$!: Observable<any>;

  constructor(public store: Store) {

  }


  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProducts());
    this.store.dispatch(ImagesActions.loadAllImages());
    this.store.dispatch(loadReviews());
    this.notification$ = this.store.select(selectNotification);

  }

}
