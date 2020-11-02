import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { CartItem } from '../../models/cart-item';
import * as fromStore from '../../../modules/shop/store/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isCartLoaded$: Observable<boolean>;
  cart$: Observable<CartItem[]>;
  amount$: Observable<number>;
  price$: Observable<number>;

  constructor(private store: Store<State>) {
    this.isCartLoaded$ = this.store.select(fromStore.isShopLoaded);
    this.cart$ = this.store.select(fromStore.getCartItems);
    this.amount$ = this.store.select(fromStore.getAmountOfItems);
    this.price$ = this.store.select(fromStore.getTotalPrice);
  }
}
