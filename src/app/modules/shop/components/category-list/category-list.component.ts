import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ShopCategory } from 'src/app/core/models/shop-category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent {
  @Input() selected: ShopCategory;
  @Input() categories: ShopCategory[];
}
