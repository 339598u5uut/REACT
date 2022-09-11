import {
    GET_INGREDIENT,
    DEL_INGREDIENT,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
} from "../actions";
import { TIngredientDetalesActions } from "../actions/ingredient-detales";

export type TIngredientDetalesState = {
    ingredient: object;
    modalOpen: boolean;
}

export const initialState: TIngredientDetalesState = {
    ingredient: {},
    modalOpen: false,
};

export const currentIngredientReducer = (state = initialState, action: TIngredientDetalesActions): TIngredientDetalesState => {
    switch (action.type) {
        case GET_INGREDIENT:
            {
                return {
                    ...state,
                    ingredient: { ...state.ingredient, ...action.array },
                };
            }
        case DEL_INGREDIENT:
            {
                return {
                    ...state,
                    ingredient: {},
                };
            }
        case OPEN_INGREDIENT_MODAL:
            {
                return {
                    ...state,
                    modalOpen: true,

                };
            }
        case CLOSE_INGREDIENT_MODAL:
            {
                return {
                    ...state,
                    modalOpen: false,
                };
            }
        default:
            return state;
    }
};