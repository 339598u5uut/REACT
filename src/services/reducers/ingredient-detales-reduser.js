import { GET_INGREDIENT, DEL_INGREDIENT } from "../actions";

const initialState = {
    ingredient: {},
};

export const currentIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENT:
            {
                return {
                    ...state,
                    ingredient: {...state.ingredient, ...action.array },
                };
            }
        case DEL_INGREDIENT:
            {
                return {
                    ...state,
                    ingredient: {},
                };
            }
        default:
            return state;
    }
};