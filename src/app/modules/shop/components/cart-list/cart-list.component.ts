import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/core/models/cart-item';
import { ShopProduct } from 'src/app/core/models/shop-product';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
  @Input() cart: CartItem[];
  @Output() increaseAmount = new EventEmitter<ShopProduct>();
  @Output() decreaseAmount = new EventEmitter<ShopProduct>();
  @Output() removeItem = new EventEmitter<ShopProduct>();

  constructor() {}
}
