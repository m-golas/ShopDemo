import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ShopProduct } from 'src/app/core/models/shop-product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  @Input() products!: ShopProduct[];
  @Output() addToCart = new EventEmitter<ShopProduct>();
  @Output() substractFromCart = new EventEmitter<ShopProduct>();
}
