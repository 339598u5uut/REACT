import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN } from "."

export const addIngredient = (ingredient) => {
    return function(dispatch) {
        (ingredient.type === 'bun') ?
        dispatch({
            type: ADD_BUN,
            array: ingredient,
        }): dispatch({
            type: ADD_INGREDIENT,
            array: ingredient,

        })
    };
}