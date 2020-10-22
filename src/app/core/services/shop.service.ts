import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopCategory } from '../models/shop-category';
import { ShopProduct } from '../models/shop-product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<ShopCategory>>{
    return this.http.get<Array<ShopCategory>>(`${environment.baseUrl}/store/public/categories/active`);
  }

  getCategory(id: number): Observable<ShopCategory>{
    return this.http.get<ShopCategory>(`${environment.baseUrl}/store/public/category/${id}`);
  }

  getProductsByCategory(id: number): Observable<ShopProduct[]>{
    return this.http.get<ShopProduct[]>(`${environment.baseUrl}/store/public/category/products/active/${id}`);
  }

  getProduct(id: number): Observable<ShopProduct>{
    return this.http.get<ShopProduct>(`${environment.baseUrl}/store/public/category/product/${id}`);
  }
}