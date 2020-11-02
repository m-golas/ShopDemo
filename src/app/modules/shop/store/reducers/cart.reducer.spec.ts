import { ShopProduct } from 'src/app/core/models/shop-product';
import * as fromCart from './cart.reducer';
import * as fromAction from '../actions';

describe('CartReducer', () => {
  const product: ShopProduct = {
    id: 2,
    displayName: 'Test',
    description: 'description',
    storeCategoryId: 2,
    price: 10,
  };
  const snapState: fromCart.State = {
    ids: [2],
    entities: { 2: { amount: 3, item: product } },
    amountOfItems: 3,
    totalPrice: 30,
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCart;
      const state = fromCart.reducer(undefined, { type: null });

      expect(state).toEqual(initialState);
    });
  });

  describe('addProductToCart action', () => {
    it('should add item if item doesnt exist', () => {
      const { initialState } = fromCart;
      const action = fromAction.addProductToCart({ product });
      const state = fromCart.reducer(initialState, action);

      expect(state.ids).toEqual([2]);
      expect(state.entities).toEqual({ 2: { amount: 1, item: product } });
      expect(state.amountOfItems).toEqual(1);
      expect(state.totalPrice).toEqual(10);
    });

    it('should increase item amount if exist', () => {
      const action = fromAction.addProductToCart({ product });
      const state = fromCart.reducer(snapState, action);

      expect(state.ids).toEqual([2]);
      expect(state.entities).toEqual({ 2: { amount: 4, item: product } });
      expect(state.amountOfItems).toEqual(4);
      expect(state.totalPrice).toEqual(40);
    });

    it('should not increase item amount above 99', () => {
      const action = fromAction.addProductToCart({ product });
      const initialState: fromCart.State = {
        ids: [2],
        entities: { 2: { amount: 99, item: product } },
        amountOfItems: 99,
        totalPrice: 990,
      };

      const state = fromCart.reducer(initialState, action);

      expect(state.ids).toEqual([2]);
      expect(state.entities).toEqual({ 2: { amount: 99, item: product } });
      expect(state.amountOfItems).toEqual(99);
      expect(state.totalPrice).toEqual(990);
    });
  });

  describe('substractProductFromCart action', () => {
    it('should return state if item doesnt exist', () => {
      const newProduct = { ...product, id: 4 };
      const action = fromAction.substractProductFromCart({
        product: newProduct,
      });
      const state = fromCart.reducer(snapState, action);

      expect(state).toEqual(snapState);
    });

    it('should decrease item amount if above 1', () => {
      const action = fromAction.substractProductFromCart({ product });
      const state = fromCart.reducer(snapState, action);

      expect(state.ids).toEqual([2]);
      expect(state.entities).toEqual({ 2: { amount: 2, item: product } });
      expect(state.amountOfItems).toEqual(2);
      expect(state.totalPrice).toEqual(20);
    });

    it('should remove item if amount will be 0', () => {
      const initialState: fromCart.State = {
        ids: [2],
        entities: { 2: { amount: 1, item: product } },
        amountOfItems: 1,
        totalPrice: 10,
      };

      const action = fromAction.substractProductFromCart({ product });
      const state = fromCart.reducer(initialState, action);

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.amountOfItems).toEqual(0);
      expect(state.totalPrice).toEqual(0);
    });
  });

  describe('removeProductFromCart action', () => {
    it('should return state if item doesnt exist', () => {
      const newProduct = { ...product, id: 4 };
      const action = fromAction.removeProductFromCart({ product: newProduct });
      const state = fromCart.reducer(snapState, action);

      expect(state).toEqual(snapState);
    });

    it('should remove item if exists', () => {
      const { initialState } = fromCart;
      const action = fromAction.removeProductFromCart({ product });
      const state = fromCart.reducer(snapState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('changeProductionAmountInCart action', () => {
    it('should return state if item doesnt exist', () => {
      const newProduct = { ...product, id: 4 };
      const action = fromAction.changeProductAmountinCart({
        product: newProduct,
        amount: 10,
      });
      const state = fromCart.reducer(snapState, action);

      expect(state).toEqual(snapState);
    });

    it('should change amount if item exist', () => {
      const action = fromAction.changeProductAmountinCart({
        product,
        amount: 10,
      });
      const state = fromCart.reducer(snapState, action);

      expect(state.ids).toEqual([2]);
      expect(state.entities).toEqual({ 2: { amount: 10, item: product } });
      expect(state.amountOfItems).toEqual(10);
      expect(state.totalPrice).toEqual(100);
    });

    it('should remove item if amount >= 0', () => {
      const { initialState } = fromCart;
      const action = fromAction.changeProductAmountinCart({
        product,
        amount: 0,
      });
      const state = fromCart.reducer(snapState, action);

      expect(state).toEqual(initialState);
    });

    it('should not let change amount above 99', () => {
      const action = fromAction.changeProductAmountinCart({
        product,
        amount: 100,
      });
      const state = fromCart.reducer(snapState, action);

      expect(state.ids).toEqual([2]);
      expect(state.entities).toEqual({ 2: { amount: 99, item: product } });
      expect(state.amountOfItems).toEqual(99);
      expect(state.totalPrice).toEqual(990);
    });
  });

  describe('resetCart action', () => {
    it('should return initialState', () => {
      const { initialState } = fromCart;
      const action = fromAction.resetCart();
      const state = fromCart.reducer(snapState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('selectors', () => {
    it('should return amountOfItems', () => {
      const state = { ...fromCart.initialState, amountOfItems: 5 };

      const result = fromCart.getAmountOfItems(state);
      expect(result).toEqual(5);
    });

    it('should return totalPrice', () => {
      const state = { ...fromCart.initialState, totalPrice: 100 };

      const result = fromCart.getTotalPrice(state);
      expect(result).toEqual(100);
    });
  });
});
