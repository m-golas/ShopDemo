import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-basket-popup',
  templateUrl: './basket-popup.component.html',
  styleUrls: ['./basket-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketPopupComponent {
  @Input() amount: number;
  @Input() cart: CartItem[];
  @Input() price: number;

  constructor() {}
}
