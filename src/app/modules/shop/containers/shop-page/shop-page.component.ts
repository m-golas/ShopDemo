import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../../core/store/reducers/index';
import { ShopCategory } from 'src/app/core/models/shop-category';
import { ShopProduct } from 'src/app/core/models/shop-product';
import * as fromShop from '../../store/reducers';
import * as shopAction from '../../store/actions';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'flex-container'}
})
export class ShopPageComponent implements OnInit {
  categories$: Observable<ShopCategory[]>;
  products$: Observable<ShopProduct[]>;
  selectedCategory$: Observable<ShopCategory>;
  showSidenav$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.categories$ = this.store.select(fromShop.getAllCategories);
    this.products$ = this.store.select(fromShop.getSelectedProducts);
    this.selectedCategory$ = this.store.select(fromShop.getSelectedCategory);
    this.showSidenav$ = this.store.select(fromShop.selectShowSidenav);
  }

  ngOnInit(): void {
  }

  addToCart(product: ShopProduct): void {
    this.store.dispatch(shopAction.addProductToCart({product}));
  }

  substractFromCart(product: ShopProduct): void {
    this.store.dispatch(shopAction.substractProductFromCart({product}));
  }

  switchMenu(): void{
    this.store.dispatch(shopAction.switchSidenav());
  }
}