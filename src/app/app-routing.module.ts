import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [  
  {
  path: 'shop',
  loadChildren: () =>
    import('./modules/shop/shop.module').then(
      (mod) => mod.ShopModule
    ),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
