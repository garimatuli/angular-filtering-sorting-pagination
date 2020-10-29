import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductListComponent} from './product-list/product-list.component';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'products/:productId', component: ProductDetailComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
