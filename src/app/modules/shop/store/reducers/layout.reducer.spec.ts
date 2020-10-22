import * as fromLayout from './layout.reducer'
import * as fromAction from '../actions'

describe('LayoutReducer', () => {
    describe('undefined action', () => {
        it('should return the default state',() => {
            const { initialState } = fromLayout;
            const state = fromLayout.reducer(undefined, {type: null});

            expect(state).toBe(initialState);
        });
    });


    describe('switchSidenav action', () => {
        it('shoudld switch showSidenav', () => {
            const { initialState } = fromLayout;
            const showSidenav = initialState.showSidenav;
            const action = fromAction.switchSidenav();
            const state = fromLayout.reducer(initialState,action);

            expect(state.showSidenav).toEqual(!showSidenav);
        })
    })

    describe('closeSidenav action', () => {
        it('shoudld change showSidenav to false', () => {
            const { initialState } = fromLayout;
            const action = fromAction.switchSidenav();
            const state = fromLayout.reducer({...initialState,showSidenav: true},action);

            expect(state.showSidenav).toEqual(false);
        })
    })
})