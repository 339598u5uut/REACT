import { combineReducers } from 'redux';
import { getAllIngredientsReducer } from './ingredients-reduser';
import { ingredientReducer } from './ingredient-reduser';
import { getNumberOrderReducer } from './order-reduser';
import { currentIngredientReducer } from './ingredient-detales-reduser';
import { userReducer } from './user-reduser';

export const rootReducer = combineReducers({
    ingredients: getAllIngredientsReducer,
    ingredient: ingredientReducer,
    currentIngredient: currentIngredientReducer,
    order: getNumberOrderReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>
