import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,

    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,

    SHOW_MODAL,
    NOT_SHOW_MODAL,
} from '../actions';



const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,

    сonstructorСomposition: [],

    modal: false,

    order: false,
    orderRequest: false,
    orderError: false,

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

export const getNumberOrder = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            {
                return {
                    ...state,
                    order: true,
                };
            }
        case GET_ORDER_SUCCESS:
            {
                return {
                    ...state,
                    orderRequest: false,
                    orderError: false,
                    order: action.number,
                };
            }
        case GET_ORDER_ERROR:
            {
                return {
                    ...state,
                    orderRequest: false,
                    orderError: true,

                };
            }
        default:
            {
                return state;
            }
    }
};


export const showModal = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            {
                return {
                    ...state,
                    modal: true,
                };
            }
        case NOT_SHOW_MODAL:
            {
                return {
                    ...state,
                    modal: false,
                };
            }
        default:
            {
                return state;
            }
    }
};