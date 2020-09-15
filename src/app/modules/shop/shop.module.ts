import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { shopFeatureKey, reducers } from './store/reducers';
import { ShopEffects } from './store/effects/shop.effects'
import { ShopPageComponent } from './containers/shop-page/shop-page.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';



@NgModule({
  declarations: [ShopPageComponent, CategoryListComponent, ProductListComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    StoreModule.forFeature(shopFeatureKey, reducers),
    EffectsModule.forFeature([ShopEffects]),
  ]
})
export class ShopModule { }
