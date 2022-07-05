import { combineReducers } from 'redux';
import { getAllIngredientsReducer } from '.';

export const rootReducer = combineReducers({
    getIngredients: getAllIngredientsReducer,
});