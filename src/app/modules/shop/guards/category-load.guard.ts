import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { ShopService } from 'src/app/core/services/shop.service';
import * as fromShop from '../store/reducers';
import * as shopAction from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class CategoryLoadGuard implements CanActivate {
  constructor(private store: Store<fromShop.State>, private router: Router, private shopService: ShopService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id = +next.params['id'];
    return this.areCategoriesLoaded().pipe(switchMap(() => this.hasProducts(id)));
  }

  hasProducts(id: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }
    return this.hasProductsInStore(id);
  }

  hasProductsInStore(id: number): Observable<boolean> {
    return this.store.pipe(
      select(fromShop.getCachedProductsGroups),
      take(1),
      mergeMap((cached) => {
        if (cached.includes(id)) {
          return of(true).pipe(tap(() => this.store.dispatch(shopAction.categorySelected({ categoryId: id }))));
        }
        return this.loadProducts(id);
      })
    );
  }

  loadProducts(id: number): Observable<boolean> {
    return this.shopService.getProductsByCategory(id).pipe(
      map((products) =>
        shopAction.productsLoadedAndCategorySelected({
          categoryId: id,
          products,
        })
      ),
      tap((action) => this.store.dispatch(action)),
      map((products) => !!products),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  areCategoriesLoaded(): Observable<boolean> {
    return this.waitForCollectionToLoad().pipe(switchMap(() => this.hasCategories()));
  }

  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.pipe(select(fromShop.isCategoryLoaded), take(1));
  }

  hasCategories(): Observable<boolean> {
    return this.hasCategoriesInStore().pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }
        return this.loadCategories();
      })
    );
  }

  hasCategoriesInStore(): Observable<boolean> {
    return this.store.pipe(select(fromShop.areCategoriesLoaded), take(1));
  }

  loadCategories(): Observable<boolean> {
    return this.shopService.getCategories().pipe(
      map((categories) => shopAction.categoriesLoaded({ categories })),
      tap((action) => this.store.dispatch(action)),
      map((categories) => !!categories),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }
}
