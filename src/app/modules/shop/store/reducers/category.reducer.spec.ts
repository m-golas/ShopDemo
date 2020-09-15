import * as fromCategory from './category.reducer'
import * as fromAction from '../actions'
import { ShopCategory } from 'src/app/core/models/shop-category';
import { from } from 'rxjs';

describe('CategoryReducer', () => {
    describe('undefined action', () => {
        it('should return the default state',() => {
            const { initialState } = fromCategory;
            const state = fromCategory.reducer(undefined, {type: null});

            expect(state).toBe(initialState);
        });
    });

    describe('categoriesLoaded action', () => {
        const categories: ShopCategory[] = [
            {id: 1,displayName: 'Test'},
            {id: 2, displayName: 'Test2'}
        ]

        const entities = {
            1: categories[0],
            2: categories[1]
        }

        it('should load categories', () => {
            const { initialState } = fromCategory;
            const action = fromAction.categoriesLoaded({categories});
            const state = fromCategory.reducer(initialState,action);

            expect(state.categoryLoaded).toEqual(true);
            expect(state.selectedCategory).toEqual(0);
            expect(state.entities).toEqual(entities);
            expect(state.ids).toEqual([1,2]);
        });

        it('should not override existing categories', () => {
            const { initialState } = fromCategory;
            const action = fromAction.categoriesLoaded({categories});
            const state = fromCategory.reducer(initialState,action);
            const nextState = fromCategory.reducer(state,action);

            expect(nextState.categoryLoaded).toEqual(true);
            expect(nextState.selectedCategory).toEqual(0);
            expect(nextState.entities).toEqual(entities);
            expect(nextState.ids).toEqual([1,2]);
        })
    });

    describe('categorySelected action', () => {
        it('should change selected category', () => {
            const { initialState } = fromCategory;
            const selectedCategory = 3;
            const action = fromAction.categorySelected({categoryId: selectedCategory});
            const state = fromCategory.reducer(initialState,action);

            expect(state.selectedCategory).toEqual(selectedCategory);
        });
    });

    describe('productsLoadedAndCategorySelected action', () => {
        it('should change selected category', () => {
            const { initialState } = fromCategory;
            const selectedCategory = 5;
            const action = fromAction.productsLoadedAndCategorySelected({categoryId: selectedCategory,products: []});
            const state = fromCategory.reducer(initialState,action);

            expect(state.selectedCategory).toEqual(selectedCategory);
        })
    })

    describe('selectors', () => {
        it('should return selected category', () => {
            const state = {...fromCategory.initialState, selectedCategory: 5};

            const result = fromCategory.getSelectedCategory(state);
            expect(result).toEqual(5);
        });

        it('should return categoryLoaded', () => {
            const state = {...fromCategory.initialState, categoryLoaded: true};

            const result = fromCategory.getCategoryLoaded(state);
            expect(result).toBeTruthy();
        });
    });
 });