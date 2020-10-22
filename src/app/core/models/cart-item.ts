import { ShopProduct } from './shop-product';

export interface CartItem {
    item: ShopProduct;
    amount: number;
}