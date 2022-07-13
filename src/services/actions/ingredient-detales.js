import { GET_INGREDIENT, DEL_INGREDIENT } from "."

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