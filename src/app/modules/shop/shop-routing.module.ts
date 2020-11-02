import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartPageComponent } from './containers/cart-page/cart-page.component';
import { ShopPageComponent } from './containers/shop-page/shop-page.component';
import { CategoryLoadGuard } from './guards/category-load.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CategoryLoadGuard],
    component: ShopPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: ':id',
    canActivate: [CategoryLoadGuard],
    component: ShopPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
