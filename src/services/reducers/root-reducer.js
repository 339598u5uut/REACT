import { combineReducers } from 'redux';
import { getAllIngredientsReducer } from './ingredients-reduser';
import { ingredientReduce } from './ingredient-reduser';
import { getNumberOrderReducer } from './order-reduser';
import { currentIngredientReduce } from './ingredient-detales-reduser';

export const rootReducer = combineReducers({
    ingredients: getAllIngredientsReducer,
    ingredient: ingredientReduce,
    currentIngredient: currentIngredientReduce,
    order: getNumberOrderReducer,
});