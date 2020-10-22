import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as shopAction from '../actions';

@Injectable()
export class ShopEffects {
    
    closeSidenav$ =  createEffect(() =>
        this.actions$.pipe(
            ofType(shopAction.productsLoadedAndCategorySelected, shopAction.categorySelected),
            mergeMap(() => {
                return of(shopAction.closeSidenav())
            })
        )
    )

    constructor(
        private actions$: Actions,
    ){}

}