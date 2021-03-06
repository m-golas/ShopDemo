import { createAction, props } from '@ngrx/store';
import { ShopCategory } from '../../../../core/models/shop-category';
import { ShopProduct } from '../../../../core/models/shop-product';

export const categoriesLoaded = createAction(
  '[Shop Effect] Categories Loaded Successfully',
  props<{ categories: ShopCategory[] }>()
);

export const categorySelected = createAction('[Shop] Category selected', props<{ categoryId: number }>());

export const productsLoadedAndCategorySelected = createAction(
  '[Shop] Products loaded and category selected',
  props<{ categoryId: number; products: ShopProduct[] }>()
);

export const addProductToCart = createAction('[Shop] Add product to cart', props<{ product: ShopProduct }>());

export const substractProductFromCart = createAction(
  '[Shop] Substract product from cart',
  props<{ product: ShopProduct }>()
);

export const removeProductFromCart = createAction('[Shop] Remove product from cart', props<{ product: ShopProduct }>());

export const changeProductAmountinCart = createAction(
  '[Shop] Change product amount in cart',
  props<{ product: ShopProduct; amount: number }>()
);

export const resetCart = createAction('[Shop] Reset cart');

export const switchSidenav = createAction('[Shop] Switch sidenav');

export const closeSidenav = createAction('[Shop] Close sidenav');
