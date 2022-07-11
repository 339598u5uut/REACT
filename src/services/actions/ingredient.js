import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN } from "."

export const addIngredient = (ingredient) => {
    return function(dispatch) {
        dispatch({
            type: ADD_INGREDIENT,
            array: ingredient,
        })
    };
}

export const addIngredientBun = (ingredient) => {
    return function(dispatch) {
        dispatch({
            type: ADD_BUN,
            array: ingredient,
        })
    };
}

export const deleteIngredient = (id) => {
    return function(dispatch) {
        dispatch({
            type: DELETE_INGREDIENT,
            id,

        })
    };
}