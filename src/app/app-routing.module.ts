import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './core/containers/error404/error404.component';


const routes: Routes = [  
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/shop'
  },
  {
  path: 'shop',
  loadChildren: () =>
    import('./modules/shop/shop.module').then(
      (mod) => mod.ShopModule
    ),
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
