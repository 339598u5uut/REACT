import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN } from "."
const { v4: uuidv4 } = require('uuid');

export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        array: {...ingredient, constructorId: uuidv4() },
    };
}

export const addIngredientBun = (ingredient) => {
    return {
        type: ADD_BUN,
        array: ingredient
    };
}

export const deleteIngredient = (id) => {
    return {
        type: DELETE_INGREDIENT,
        id
    };
}