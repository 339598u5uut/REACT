import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR } from "../actions";


const initialState = {
    order: '',
    orderRequest: false,
    orderError: false,
};

export const getNumberOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            {
                return {
                    ...state,
                    orderRequest: true,
                };
            }
        case GET_ORDER_SUCCESS:
            {
                return {
                    ...state,
                    orderRequest: false,
                    orderError: false,
                    order: action.order,
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