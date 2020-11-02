import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { shopFeatureKey, reducers } from './store/reducers';
import { ShopEffects } from './store/effects/shop.effects';

import { ShopPageComponent } from './containers/shop-page/shop-page.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartPageComponent } from './containers/cart-page/cart-page.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { AmountInputComponent } from './components/amount-input/amount-input.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { ShopLayoutComponent } from './components/shop-layout/shop-layout.component';
import { CartLayoutComponent } from './components/cart-layout/cart-layout.component';

@NgModule({
  declarations: [
    ShopPageComponent,
    CategoryListComponent,
    ProductListComponent,
    ProductCardComponent,
    CartPageComponent,
    CartListComponent,
    CartSummaryComponent,
    AmountInputComponent,
    DeleteButtonComponent,
    ShopLayoutComponent,
    CartLayoutComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    StoreModule.forFeature(shopFeatureKey, reducers),
    EffectsModule.forFeature([ShopEffects]),
  ],
})
export class ShopModule {}
