import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ShopProduct } from 'src/app/core/models/shop-product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product: ShopProduct;
  @Output() addToCart = new EventEmitter<ShopProduct>();
  @Output() substractFromCart = new EventEmitter<ShopProduct>();
}
