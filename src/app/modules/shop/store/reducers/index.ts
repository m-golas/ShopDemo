import { createSelector, createFeatureSelector, combineReducers, Action } from '@ngrx/store';
import { ShopProduct } from '../../../../core/models/shop-product';
import * as fromCategory from './category.reducer';
import * as fromProduct from './product.reducer';
import * as fromCart from './cart.reducer';
import * as fromLayout from './layout.reducer';
import * as fromRoot from '../../../../core/store/reducers';

export const shopFeatureKey = 'shop';

export interface ShopState {
  [fromCategory.categoryFeatureKey]: fromCategory.State;
  [fromProduct.productFeatureKey]: fromProduct.State;
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromLayout.layoutFeatureKey]: fromLayout.State;
}

export interface State extends fromRoot.State {
  [shopFeatureKey]: ShopState;
}

export function reducers(state: ShopState | undefined, action: Action) {
  return combineReducers({
    [fromCategory.categoryFeatureKey]: fromCategory.reducer,
    [fromProduct.productFeatureKey]: fromProduct.reducer,
    [fromCart.cartFeatureKey]: fromCart.reducer,
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
  })(state, action);
}

export const selectShopState = createFeatureSelector<State, ShopState>(shopFeatureKey);
export const isShopLoaded = createSelector(selectShopState, (shop) => !!shop);

export const selectCategoryEntitiesState = createSelector(
  selectShopState,
  (state) => state[fromCategory.categoryFeatureKey]
);
export const isCategoryLoaded = createSelector(selectShopState, (state) => !!state[fromCategory.categoryFeatureKey]);

export const getSelectedCategoryId = createSelector(selectCategoryEntitiesState, fromCategory.getSelectedCategory);

export const areCategoriesLoaded = createSelector(selectCategoryEntitiesState, fromCategory.areCategoriesLoaded);

export const { selectAll: getAllCategories } = fromCategory.adapter.getSelectors(selectCategoryEntitiesState);

export const getSelectedCategory = createSelector(
  selectCategoryEntitiesState,
  getSelectedCategoryId,
  (entities, selectedCategoryId) => entities.entities[selectedCategoryId]
);

export const selectProductEntitiesState = createSelector(
  selectShopState,
  (state) => state[fromProduct.productFeatureKey]
);
export const isProductLoaded = createSelector(selectShopState, (state) => !!state[fromProduct.productFeatureKey]);

export const getCachedProductsGroups = createSelector(selectProductEntitiesState, fromProduct.getCachedProductsGroups);

export const getProductById = createSelector(selectProductEntitiesState, (entities, props) => entities[props.id]);

export const { selectAll: getAllProducts } = fromProduct.adapter.getSelectors(selectProductEntitiesState);

export const getSelectedProducts = createSelector(
  getSelectedCategoryId,
  getAllProducts,
  (selectedCategory: number, products: ShopProduct[]) =>
    products.filter((product: ShopProduct) => product.storeCategoryId === selectedCategory)
);

export const selectCartState = createSelector(selectShopState, (state) => state[fromCart.cartFeatureKey]);
export const isCartLoaded = createSelector(selectShopState, (state) => !!state[fromCart.cartFeatureKey]);

export const getAmountOfItems = createSelector(selectCartState, isShopLoaded, (cart, shop) =>
  cart ? cart.amountOfItems : 0
);

export const getTotalPrice = createSelector(selectCartState, fromCart.getTotalPrice);

export const { selectAll: getCartItems } = fromCart.adapter.getSelectors(selectCartState);

export const selectLayoutState = createSelector(selectShopState, (state) => state[fromLayout.layoutFeatureKey]);

export const selectShowSidenav = createSelector(selectLayoutState, fromLayout.selectShowSidenav);
