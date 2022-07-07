import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN } from "../actions";




const initialState = {
    ingredientBun: {},
    ingredientItems: [],
};

export const addIngredientReduce = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUN:
            {
                return {
                    ...state,
                    ingredientBun: {...state.ingredientBun, ...action.array }
                }
            }
        case ADD_INGREDIENT:
            {
                return {
                    ...state,
                    ingredientItems: {...state.ingredientItems, ...action.array }
                }
            }
        case DELETE_INGREDIENT:
            {
                return {
                    ...state,
                    ingredientItems: [...state.ingredientItems].filter((ingredientItem) => ingredientItem._id !== ingredientItem._uuid)
                }
            }
        default:
            return state
    }
}