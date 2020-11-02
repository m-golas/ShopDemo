import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ShopCategory } from 'src/app/core/models/shop-category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() categorySelected: ShopCategory;
}
