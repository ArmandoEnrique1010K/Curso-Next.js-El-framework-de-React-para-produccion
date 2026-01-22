import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";

export const localstorageMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => (action: Action) => {

        next(action);
        // console.log(action);

        if (action.type === 'pokemons/toogleFavorite'){
            const { pokemons } = state.getState() as RootState;
            localStorage.setItem('favorite-pokemons', JSON.stringify(pokemons));
            return
        }
        // console.log({state: state.getState()})
    }
}