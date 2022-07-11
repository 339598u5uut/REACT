import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
} from '../actions';


const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
};


export const getAllIngredientsReducer = (state = initialState, action) => {
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