import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopPageComponent } from './containers/shop-page/shop-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ShopPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
