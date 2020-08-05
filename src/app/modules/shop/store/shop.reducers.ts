import { ShopCategory } from "../../../core/models/shop-category";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShopProduct } from "../../../core/models/shop-product";
import { createReducer, on } from "@ngrx/store";
import { shopActionTypes } from './shop.actions';

export interface CategoryState extends EntityState<ShopCategory> {
    categoryLoaded: boolean;
}

export interface ProductState extends EntityState<ShopProduct>{
}

export const categoryAdapter: EntityAdapter<ShopCategory> = createEntityAdapter<ShopCategory>({
    selectId: (category: ShopCategory) => category.id,
    sortComparer: false,
});

export const productAdapter: EntityAdapter<ShopProduct> = createEntityAdapter<ShopProduct>({
    selectId: (product: ShopProduct) => product.id,
    sortComparer: false,
})

export interface ShopState {
    categories: CategoryState;
    products: ProductState;
    selectedCategory: number; 
}

export const initialState: ShopState = {
    categories: categoryAdapter.getInitialState({categoryLoaded: false}),
    products: productAdapter.getInitialState(),
    selectedCategory: 1
}

export const shopReducer = createReducer(
    initialState,
    
    on(shopActionTypes.categoriesLoaded, (state, { categories }) => (
        {
            ...state,
            categories: categoryAdapter.addMany(categories, {...state.categories,categoryLoaded: true}),
        }
    )),

    on(shopActionTypes.productsByCategoryLoaded, (state, { products }) => (
        {
            ...state,
            products: productAdapter.addMany(products, state.products)
        }
    )),

    on(shopActionTypes.categorySelected, (state, {selectedId}) => (
        {
            ...state,
            selectedCategory: selectedId,
        }
    ))
)

