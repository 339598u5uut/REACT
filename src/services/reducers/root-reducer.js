import { combineReducers } from 'redux';
import { getAllIngredientsReducer } from './ingredients-reduser';
import { ingredientReducer } from './ingredient-reduser';
import { getNumberOrderReducer } from './order-reduser';
import { currentIngredientReducer } from './ingredient-detales-reduser';
import { getForgotPasswordReducer } from './forgot-password-reduser';
import { getRecoveryPasswordReducer } from './reset-password-reduser';
import { getCreateUserReducer } from './register-user-reduser';
import { loginReducer } from './login-reduser';
import { logoutReducer } from './logout-reduser';
import { userReducer } from './get-user-reduser';

export const rootReducer = combineReducers({
    ingredients: getAllIngredientsReducer,
    ingredient: ingredientReducer,
    currentIngredient: currentIngredientReducer,
    order: getNumberOrderReducer,
    forgotPassword: getForgotPasswordReducer,
    recoveryPassword: getRecoveryPasswordReducer,
    createUser: getCreateUserReducer,
    authorization: loginReducer,
    logout: logoutReducer,
    user: userReducer,
});