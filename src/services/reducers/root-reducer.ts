import { ActionCreator, combineReducers } from 'redux';
import { getAllIngredientsReducer } from './ingredients-reduser';
import { ingredientReducer } from './ingredient-reduser';
import { getNumberOrderReducer } from './order-reduser';
import { currentIngredientReducer } from './ingredient-detales-reduser';
import { userReducer } from './user-reduser';
import { store } from '../../';
import { TIngredientDetalesActions } from '../actions/ingredient-detales';
import { TIngredientActions } from '../actions/ingredient';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { wsReducer } from './ws-reduser';
import { TUserActions } from '../actions/user';
import { TWSActions } from '../actions/ws';
import {
    TypedUseSelectorHook, useSelector as selectorHook,
    useDispatch as dispatchHook
} from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export const rootReducer = combineReducers({
    ingredients: getAllIngredientsReducer,
    ingredient: ingredientReducer,
    currentIngredient: currentIngredientReducer,
    order: getNumberOrderReducer,
    user: userReducer,
    ws: wsReducer,
});


export type TAllActions = TIngredientDetalesActions | TIngredientActions
    | TIngredientsActions | TOrderActions | TUserActions | TWSActions;
export type TApplicationActions = TAllActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn,
        RootState,
        never,
        TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
