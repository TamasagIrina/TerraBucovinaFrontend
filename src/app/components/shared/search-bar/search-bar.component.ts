import { Component } from '@angular/core';
import { Product } from '../../core/interfaces/product.interface';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllProductsWithPrimaryImage } from '../../core/store/products/products.selectors';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  query = '';
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];

  private searchInput$ = new Subject<string>();
  private subscription = new Subscription();

  constructor(private store: Store, private router: Router) {

  }

  ngOnInit(): void {
    // Subscribe to all products from NgRx store
    const productsSub = this.store.select(selectAllProductsWithPrimaryImage).subscribe(products => {
      this.allProducts = products;
    });
    this.subscription.add(productsSub);

    // Handle input stream with debounce
    const searchSub = this.searchInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(term => this.filterProducts(term));

    this.subscription.add(searchSub);
  }

  filterProducts(term: string): void {
    if (!term) {
      this.filteredProducts = [];
      return;
    }

    const lower = term.toLowerCase();
    this.filteredProducts = this.allProducts.filter(p =>
      p.name.toLowerCase().includes(lower)
    );
  }

  onSearch(): void {
    this.searchInput$.next(this.query);
  }

  selectProduct(product: Product) {

    this.router.navigateByUrl(`/details/${product.id}`);

    this.query = '';

  }

  closeDropdown(): void {
    this.query = '';
    this.filteredProducts = [];
  }

}
