import { createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CartItem } from "../../../../core/models/cart-item"
import { ShopProduct } from "../../../../core/models/shop-product";
import  * as shopAction from '../actions';

export const cartFeatureKey = 'cart';

export interface State extends EntityState<CartItem> {
    amountOfItems: number;
    totalPrice: number;
}

export const adapter: EntityAdapter<CartItem> = createEntityAdapter<CartItem>({
    selectId: (item: CartItem) => item.item.id,
    sortComparer: false
})

export const initialState = adapter.getInitialState({
    amountOfItems: 0,
    totalPrice: 0
})

export const reducer = createReducer(
    initialState,

    on(shopAction.addProductToCart, (state, {product}) => (
        addItem(state,product,doesExist(product,state))
    )),

    on(shopAction.substractProductFromCart, (state, {product}) => (
        substractItem(state,product,doesExist(product,state))
    )),

    on(shopAction.removeProductFromCart, (state, {product}) => (
        removeItem(state,product,doesExist(product,state))
    )),

    on(shopAction.changeProductAmountinCart, (state, {product,amount}) => (
        changeAmount(state,product,amount,doesExist(product,state))
    )),

    on(shopAction.resetCart, () => (
        initialState
    ))
)

const changeAmount = (state: State, product: ShopProduct, amount: number, exist: boolean): State => {
    if(!exist){
        return {...state}
    }
    if(amount <= 0){
        return removeItem(state,product,exist);
    } else {
        if(amount > 99){
            amount = 99
        };
        const currentAmount = state.entities[product.id].amount;

        return adapter.updateOne(
            {id: product.id,changes: {amount}},
            {
                ...state, 
                totalPrice: state.totalPrice + (amount - currentAmount) * product.price,
                amountOfItems: state.amountOfItems + (amount - currentAmount)
            }
        )
    }
}

const addItem = (state: State, product: ShopProduct, exist: boolean): State => {
    if(!exist){
        return adapter.addOne(
            {item: product, amount: 1},
            {...state, totalPrice: state.totalPrice + product.price, amountOfItems: state.amountOfItems + 1}
        )
    }
    return changeAmount(state,product, state.entities[product.id].amount + 1, exist);
}

const removeItem = (state: State, product: ShopProduct, exist: boolean): State => {
    if(!exist){
        return {...state}
    }
    let amount = state.entities[product.id].amount;

    return adapter.removeOne(product.id,{
        ...state,
        amountOfItems: state.amountOfItems - amount,
        totalPrice: state.totalPrice - amount * product.price
    })
}

const substractItem = (state: State, product: ShopProduct, exist: boolean): State => {
    if(!exist){
        return {...state}
    } 
    return changeAmount(state,product, state.entities[product.id].amount - 1, exist);
}

const doesExist = (product: ShopProduct,state: State): boolean => {
    return state.entities[product.id] ? true : false;
}

export const getAmountOfItems = (state: State) => state.amountOfItems;
export const getTotalPrice = (state: State) => state.totalPrice;