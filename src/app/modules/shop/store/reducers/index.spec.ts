import * as fromShop from './index';
import { ShopProduct } from 'src/app/core/models/shop-product';

describe('ShopReducer', () => {
    it('should return selected products', () => {
        const products: ShopProduct[] = [
            {
                id: 5,
                storeCategoryId: 3,
                displayName: 'VIP+ (30 dni)',
                description: 'VIP+',
                price: 30
            },
            {
                id: 4,
                storeCategoryId: 3,
                displayName: 'VIP (30 dni)',
                description: 'Ranga vip',
                price: 20
            },
            {
                id: 3,
                storeCategoryId: 2,
                displayName: 'Master Ball (1x)',
                description: 'Tym Ball\'em złapiesz każdego pokemona!',
                price: 10
              },
        ]

        const filteredProducts: ShopProduct[] = [
            {
                id: 5,
                storeCategoryId: 3,
                displayName: 'VIP+ (30 dni)',
                description: 'VIP+',
                price: 30
            },
            {
                id: 4,
                storeCategoryId: 3,
                displayName: 'VIP (30 dni)',
                description: 'Ranga vip',
                price: 20
            }
        ]
        expect(fromShop.getSelectedProducts.projector(3,products)).toEqual(filteredProducts);
    })
})
