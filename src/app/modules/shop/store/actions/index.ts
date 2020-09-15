import { createAction, props } from '@ngrx/store';
import { ShopCategory } from '../../../../core/models/shop-category';
import { ShopProduct } from '../../../../core/models/shop-product';

export const loadShopCategories = createAction('[Shop] Load categories');

export const categoriesLoaded = createAction(
    '[Shop Effect] Categories Loaded Successfully',
    props<{categories: ShopCategory[]}>()
);

export const categoriesLoadError = createAction(
    '[Shop Effect] Categories Load Error',
)

export const loadShopProductsByCategory = createAction(
    '[Shop] Load products by category',
    props<{categoryId: number}>()
);

export const productsByCategoryLoadError = createAction(
    '[Shop Effect] Products by category Load Error',
)

export const selectCategory = createAction(
    '[Shop] Select shop category',
    props<{categoryId: number}>()
)

export const categorySelected = createAction(
    '[Shop Effect] Category selected',
    props<{categoryId: number}>()
)

export const productsLoadedAndCategorySelected = createAction(
    '[Shop Effect] Products loaded and category selected',
    props<{categoryId: number; products: ShopProduct[]}>()
)

export const addProductToCart = createAction(
    '[Shop] Add product to cart',
    props<{product: ShopProduct}>()
)

export const substractProductFromCart = createAction(
    '[Shop] Substract product from cart',
    props<{product: ShopProduct}>()
)

export const removeProductFromCart = createAction(
    '[Shop] Remove product from cart',
    props<{product: ShopProduct}>()
)

export const changeProductAmountinCart = createAction(
    '[Shop] Change product amount in cart',
    props<{product: ShopProduct, amount: number}>()
)

