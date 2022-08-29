import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN, ARRAY_DRAG_MOVE, CLEAR_CONSTRUCTOR } from "../actions";
import { TIngredientInState } from "../../utils/types";
import { TIngredientActions } from "../actions/ingredient";


export type TIngredientState = {
    ingredientBun: { _id: string };
    ingredientItems: TIngredientInState[];
}

const initialState: TIngredientState = {
    ingredientBun: { _id: '' },
    ingredientItems: [],
};

export const ingredientReducer = (state = initialState, action: TIngredientActions): TIngredientState => {
    switch (action.type) {
        case ADD_BUN:
            {
                return {
                    ...state,
                    ingredientBun: { ...state.ingredientBun, ...action.array }
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
                const newState = { ...state };
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
        case CLEAR_CONSTRUCTOR:
            {
                return {
                    ...state,
                    ingredientItems: initialState.ingredientItems,
                    ingredientBun: initialState.ingredientBun,
                }
            }
        default:
            return state
    }
}