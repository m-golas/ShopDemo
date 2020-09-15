import { createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShopProduct } from '../../../../core/models/shop-product';
import * as shopAction from '../actions';

export const productFeatureKey = 'product';

export interface State extends EntityState<ShopProduct> {
    cachedProductsGroups: Array<number>;
}

export const adapter: EntityAdapter<ShopProduct> = createEntityAdapter<ShopProduct>({
    selectId: (product: ShopProduct) => product.id,
    sortComparer: false,
});

export const initialState = adapter.getInitialState({
    cachedProductsGroups: [],
})

export const reducer = createReducer(
    initialState,

    on(shopAction.productsLoadedAndCategorySelected, (state, {categoryId, products}) => (
        adapter.addMany(products, {...state,cachedProductsGroups: [...state.cachedProductsGroups,categoryId]})
    ))
)

export const getCachedProductsGroups = (state: State) => state.cachedProductsGroups;