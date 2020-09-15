import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../../core/store/reducers/index';
import { ShopCategory } from 'src/app/core/models/shop-category';
import { ShopProduct } from 'src/app/core/models/shop-product';
import { CartItem } from 'src/app/core/models/cart-item';
import * as shopSelector from '../../store/reducers';
import * as shopAction from '../../store/actions';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {

  categories$: Observable<ShopCategory[]>;
  products$: Observable<ShopProduct[]>
  cart$: Observable<CartItem[]>;
  amount$: Observable<number>;
  price$: Observable<number>;

  constructor(private store: Store<State>) {
    this.categories$ = this.store.select(shopSelector.getAllCategories);
    this.products$ = this.store.select(shopSelector.getSelectedProducts);
    this.cart$ = this.store.select(shopSelector.getCartItems);
    this.amount$ = this.store.select(shopSelector.getAmountOfItems);
    this.price$ = this.store.select(shopSelector.getTotalPrice);
  }

  ngOnInit(): void {
    this.store.dispatch(shopAction.loadShopCategories());
  }

  selectCategory(category: ShopCategory): void {
    this.store.dispatch(shopAction.selectCategory({categoryId: category.id}));
  }

  addToCart(product: ShopProduct): void {
    this.store.dispatch(shopAction.addProductToCart({product}));
  }

  substractFromCart(product: ShopProduct): void {
    this.store.dispatch(shopAction.substractProductFromCart({product}));
  }

}
