import { createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShopCategory } from "../../../../core/models/shop-category";
import * as shopAction from '../actions';

export const categoryFeatureKey = 'category';

export interface State extends EntityState<ShopCategory> {
    categoryLoaded: boolean;
    selectedCategory: number;
}

export const adapter: EntityAdapter<ShopCategory> = createEntityAdapter<ShopCategory>({
    selectId: (category: ShopCategory) => category.id,
    sortComparer: false,
});

export const initialState = adapter.getInitialState({
    categoryLoaded: false,
    selectedCategory: 0,
})

export const reducer = createReducer(
    initialState,

    on(shopAction.categoriesLoaded, (state, { categories }) => (
        adapter.addMany(categories, {...state,categoryLoaded: true})
    )),

    on(shopAction.categorySelected, (state, {categoryId}) => (
        {
            ...state,
            selectedCategory: categoryId
        }
    )),

    on(shopAction.productsLoadedAndCategorySelected, (state, {categoryId}) => (
        {
            ...state,
            selectedCategory: categoryId
        }
    ))
)

export const getSelectedCategory = (state: State) => state.selectedCategory;
export const getCategoryLoaded = (state: State) => state.categoryLoaded;