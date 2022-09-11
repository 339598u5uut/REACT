import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
} from '../actions';
import { TIngredient } from '../../utils/types';
import { TIngredientsActions } from '../actions/ingredients';

export type TIngredientsState={
    ingredients:ReadonlyArray<TIngredient>;
    ingredientsRequest:boolean;
    ingredientsError:boolean;
}

export const initialState:TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
};

export const getAllIngredientsReducer = (state = initialState, action:TIngredientsActions):TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            {
                return {
                    ...state,
                    ingredientsRequest: true,
                };
            }
        case GET_INGREDIENTS_SUCCESS:
            {
                return {
                    ...state,
                    ingredientsRequest: false,
                    ingredientsError: false,
                    ingredients: [...action.ingredients]
                };
            }
        case GET_INGREDIENTS_ERROR:
            {
                return {
                    ...state,
                    ingredientsRequest: false,
                    ingredientsError: true,

                };
            }
        default:
            {
                return state;
            }
    }
};