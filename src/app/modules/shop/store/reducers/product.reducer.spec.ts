import { ShopProduct } from 'src/app/core/models/shop-product';
import * as fromProduct from './product.reducer';
import * as fromAction from '../actions';

describe('ProductReducer', () => {
    
    describe('undefined action', () => {
        it('should returm the default state',() => {
            const { initialState } = fromProduct;
            const state = fromProduct.reducer(undefined, {type: null});

            expect(state).toBe(initialState);
        });
    });

    describe('productsLoadedAndCategorySelected', () => {
        const categoryId = 3

        const products: ShopProduct[] = [
            {id: 1,displayName: 'Test',description: 'description',price: 10,storeCategoryId: categoryId},
            {id: 2,displayName: 'Test',description: 'description',price: 10,storeCategoryId: categoryId},
            {id: 3,displayName: 'Test',description: 'description',price: 10,storeCategoryId: categoryId},
        ];

        const entities = {
            1: products[0],
            2: products[1],
            3: products[2]
        };

        it('should load products', () => {
            const { initialState } = fromProduct;
            const action = fromAction.productsLoadedAndCategorySelected({categoryId, products});
            const state = fromProduct.reducer(initialState,action);

            expect(state.cachedProductsGroups).toEqual([categoryId]);
            expect(state.entities).toEqual(entities);
            expect(state.ids).toEqual([1,2,3]);
        })

        it('should add new products without deleting old and cache group', () => {
            const { initialState } = fromProduct;
            const action = fromAction.productsLoadedAndCategorySelected({categoryId, products});
            const state = fromProduct.reducer(initialState,action);

            const nextCategory = 4

            const nextProducts: ShopProduct[] = [
                {id: 4,displayName: 'Test',description: 'description',price: 10,storeCategoryId: nextCategory},
            ];

            const nextEntities = {
                1: products[0],
                2: products[1],
                3: products[2],
                4: nextProducts[0]
            };

            const nextAction = fromAction.productsLoadedAndCategorySelected({categoryId: nextCategory, products: nextProducts});
            const nextState = fromProduct.reducer(state, nextAction);

            expect(nextState.cachedProductsGroups).toEqual([categoryId,nextCategory]);
            expect(nextState.entities).toEqual(nextEntities);
            expect(nextState.ids).toEqual([1,2,3,4]);
        })
    })

    describe('selectors', () => {
        it('should return cachedProductsGroups', () => {
            const state = {...fromProduct.initialState, cachedProductsGroups: [3]};
            
            const result = fromProduct.getCachedProductsGroups(state);
            expect(result).toEqual([3]);
        })
    })
})