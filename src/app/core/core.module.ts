import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasketPopupComponent } from './components/basket-popup/basket-popup.component';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';
import { BasketIconComponent } from './components/basket-icon/basket-icon.component';
import { Error404Component } from './containers/error404/error404.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BasketPopupComponent,
    HeaderLayoutComponent,
    BasketIconComponent,
    Error404Component,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule, StoreModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
