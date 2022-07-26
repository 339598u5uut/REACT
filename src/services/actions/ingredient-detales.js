import {
    GET_INGREDIENT,
    DEL_INGREDIENT,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
} from "."

export const getIngredient = (ingredient) => {
    return {
        type: GET_INGREDIENT,
        array: ingredient
    }
}
export const deleteIngredient = () => {
    return {
        type: DEL_INGREDIENT
    }
}

export const openIngredientModal = () => {
    return {
        type: OPEN_INGREDIENT_MODAL
    }
}

export const closeIngredientModal = () => {
    return {
        type: CLOSE_INGREDIENT_MODAL
    }
}