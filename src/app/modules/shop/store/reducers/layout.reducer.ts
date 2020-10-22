import { createReducer, on } from "@ngrx/store";
import * as shopAction from '../actions';

export const layoutFeatureKey = 'layout';

export interface State {
    showSidenav: boolean;
}

export const initialState = {
    showSidenav: false
}

export const reducer = createReducer(
    initialState,

    on(shopAction.switchSidenav, (state) => (
        {
            ...state,
            showSidenav: !state.showSidenav
        }
    )),

    on(shopAction.closeSidenav, (state) => (
        {
            ...state,
            showSidenav: false
        }
    )),
);

export const selectShowSidenav= (state: State) => state.showSidenav;