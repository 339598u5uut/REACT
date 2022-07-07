import { combineReducers } from 'redux';
import { getAllIngredientsReducer } from './ingredients-reduser';
import { addIngredientReduce } from './ingredient-reduser';
import { getNumberOrderReducer } from './order-reduser';

export const rootReducer = combineReducers({
    ingredients: getAllIngredientsReducer,
    ingredient: addIngredientReduce,
    order: getNumberOrderReducer,
});