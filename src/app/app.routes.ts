import { Routes } from '@angular/router';
import { ShopComponent } from './components/features/shop/shop.component';
import { AboutComponent } from './components/features/about/about.component';
import { ContactComponent } from './components/features/contact/contact.component';
import { CartComponent } from './components/features/cart/cart.component';
import { PurchaseComponent } from './components/features/purchase/purchase.component';
import { ProductDetailsComponent } from './components/features/product-details/product-details.component';

export const routes: Routes = [
    { path: 'shop', component: ShopComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'cart', component: CartComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: 'details', component: ProductDetailsComponent },
    { path: '', redirectTo: 'shop', pathMatch: 'full' },
    { path: '**', redirectTo: 'shop' }
];
