import { ShopCategory } from '../../../core/models/shop-category';
import { ShopProduct } from '../../../core/models/shop-product';
import { createAction, props } from '@ngrx/store'

export const loadShopCategories = createAction('[Shop] Load categories');

export const categoriesLoaded = createAction(
    '[Shop Effect] Categories Loaded Successfully',
    props<{categories: ShopCategory[]}>()
);

export const loadShopProductsByCategory = createAction(
    '[Shop] Load products by category',
    props<{categoryId: number}>()
);

export const productsByCategoryLoaded = createAction(
    '[Shop Effect] Products by category loaded successfully',
    props<{products: ShopProduct[]}>()
)

export const selectCategory = createAction(
    '[Shop] Select shop category',
    props<{selectedId: number}>()
)

export const categorySelected = createAction(
    '[Shop Effect] Category selected',
    props<{selectedId: number}>()
)

export const shopActionTypes = {
    loadShopCategories,
    categoriesLoaded,
    loadShopProductsByCategory,
    productsByCategoryLoaded,
    selectCategory,
    categorySelected
}