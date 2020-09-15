import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { mergeMap, map, catchError, withLatestFrom, concatMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShopService } from '../../../../core/services/shop.service';
import * as shopAction from '../actions';
import * as shopSelector from '../reducers'


@Injectable()
export class ShopEffects {

    loadCategories$ =  createEffect(() =>
        this.actions$.pipe(
            ofType(shopAction.loadShopCategories),
            mergeMap(() => this.shopService.getCategories().pipe(
                    map( categories => shopAction.categoriesLoaded({categories})),
                    catchError(() => of(shopAction.categoriesLoadError))
                )
            )
        )
    )
    
    loadFirstsProducts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(shopAction.categoriesLoaded),
            mergeMap( action => this.shopService.getProductsByCategory( action.categories[0].id).pipe(
                    map( products => shopAction.productsLoadedAndCategorySelected({categoryId: action.categories[0].id, products})),
                    catchError(() => of(shopAction.productsByCategoryLoadError))
                ) 
            )
        )
    )

    loadProductsByCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(shopAction.selectCategory),
            concatMap(action => of(action).pipe(
                withLatestFrom(this.store.pipe(select(shopSelector.getCachedProductsGroups))),
            )),
            mergeMap(([{categoryId}, cached]) => {
                if(cached.includes(categoryId)){
                    return of(shopAction.categorySelected({categoryId}));
                } else {
                    return this.shopService.getProductsByCategory(categoryId).pipe(
                        map( products => shopAction.productsLoadedAndCategorySelected({categoryId, products})),
                        catchError(() => of(shopAction.productsByCategoryLoadError))
                    );
                }
            })
        )
    )

    constructor(
        private actions$: Actions,
        private shopService: ShopService,
        private store: Store
    ){}
}