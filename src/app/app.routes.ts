import { Routes } from '@angular/router';
import { ShopComponent } from './components/features/shop/shop.component';
import { AboutComponent } from './components/features/about/about.component';
import { ContactComponent } from './components/features/contact/contact.component';
import { CartComponent } from './components/features/cart/cart.component';
import { PurchaseComponent } from './components/features/purchase/purchase.component';
import { ProductDetailsComponent } from './components/features/product-details/product-details.component';
import { LoginComponent } from './components/features/login/login.component';
import { AddProductComponent } from './components/features/add-product/add-product.component';

export const routes: Routes = [
    { path: 'shop', component: ShopComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'add-pr', component: AddProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: 'details/:id', component: ProductDetailsComponent },
    { path: '', redirectTo: 'shop', pathMatch: 'full' },
    { path: '**', redirectTo: 'shop' }
];
