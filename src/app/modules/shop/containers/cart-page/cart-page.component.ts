import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../../core/store/reducers/index';
import { ShopProduct } from 'src/app/core/models/shop-product';
import { CartItem } from 'src/app/core/models/cart-item';
import * as fromShop from '../../store/reducers';
import * as shopAction from '../../store/actions';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-container' },
})
export class CartPageComponent implements OnInit {
  isCartLoaded$: Observable<boolean>;
  cart$: Observable<CartItem[]>;
  amount$: Observable<number>;
  price$: Observable<number>;

  constructor(private store: Store<State>) {
    this.isCartLoaded$ = this.store.select(fromShop.isShopLoaded);
    this.cart$ = this.store.select(fromShop.getCartItems);
    this.amount$ = this.store.select(fromShop.getAmountOfItems);
    this.price$ = this.store.select(fromShop.getTotalPrice);
  }

  ngOnInit(): void {}

  addToCart(product: ShopProduct): void {
    this.store.dispatch(shopAction.addProductToCart({ product }));
  }

  substractFromCart(product: ShopProduct): void {
    this.store.dispatch(shopAction.substractProductFromCart({ product }));
  }

  removeProductFromCart(product: ShopProduct): void {
    this.store.dispatch(shopAction.removeProductFromCart({ product }));
  }

  resetCart(): void {
    this.store.dispatch(shopAction.resetCart());
  }
}
