import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN, ARRAY_DRAG_MOVE } from "../actions";

const initialState = {
    ingredientBun: {},
    ingredientItems: [],
};

export const ingredientReduce = (state = initialState, action) => {
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
                    ingredientItems: [...state.ingredientItems, action.array],

                }
            }
        case DELETE_INGREDIENT:
            {
                const newState = {...state };
                const itemIndex = newState.ingredientItems.findIndex(
                    (item) => item._id === action.id
                )
                newState.ingredientItems.splice(itemIndex, 1);
                return {
                    ...state,
                    ingredientItems: [...newState.ingredientItems],
                };
            }
        case ARRAY_DRAG_MOVE:
            {
                return {
                    ...state,
                    ingredientItems: [...action.array],
                }
            }
        default:
            return state
    }
}