import { Routes } from '@angular/router';
import { ShopComponent } from './components/features/shop/shop.component';
import { AboutComponent } from './components/features/about/about.component';
import { ContactComponent } from './components/features/contact/contact.component';
import { CartComponent } from './components/features/cart/cart.component';
import { PurchaseComponent } from './components/features/purchase/purchase.component';
import { ProductDetailsComponent } from './components/features/product-details/product-details.component';
import { LoginComponent } from './components/features/login/login.component';
import { AddProductComponent } from './components/features/add-product/add-product.component';
import { authGuard } from './components/core/auth/auth.guard';
import { ForbiddenComponent } from './components/features/forbidden/forbidden.component';
import { SeeAllOredersComponent } from './components/features/see-all-oreders/see-all-oreders.component';
import { SeeAllContactUsMessagesComponent } from './components/features/see-all-contact-us-messages/see-all-contact-us-messages.component';
import { UserSeeOrdersComponent } from './components/features/user-see-orders/user-see-orders.component';
import { UserAccountComponent } from './components/features/user-account/user-account.component';

export const routes: Routes = [
    { path: 'shop', component: ShopComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin/add-product', component: AddProductComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'admin/see-all-orders', component: SeeAllOredersComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'admin/see-all-contact-us-mesages', component: SeeAllContactUsMessagesComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'user/see-orders', component: UserSeeOrdersComponent, canActivate: [authGuard], data: { roles: ['ROLE_USER'] } },
    { path: 'user/account', component: UserAccountComponent, canActivate: [authGuard], data: { roles: ['ROLE_USER'] } },
    { path: 'cart', component: CartComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: 'details/:id', component: ProductDetailsComponent },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: '', redirectTo: 'shop', pathMatch: 'full' },
    { path: '**', redirectTo: 'shop' }
];
