import { GET_INGREDIENT, DEL_INGREDIENT } from "."

export const getIngredient = (ingredient) => {
    return dispatch => {
        dispatch({
            type: GET_INGREDIENT,
            array: ingredient
        })
    }
}
export const deleteIngredient = () => (
    dispatch => dispatch({ type: DEL_INGREDIENT }))