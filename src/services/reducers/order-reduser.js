import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL } from "../actions";

const initialState = {
    order: '',
    orderRequest: false,
    orderError: false,
    isFetching: false,
    orderOpen: false,
};

export const getNumberOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            {
                return {
                    ...state,
                    orderRequest: true,
                    isFetching: true,
                };
            }
        case GET_ORDER_SUCCESS:
            {
                return {
                    ...state,
                    orderRequest: false,
                    orderError: false,
                    order: action.order,
                    isFetching: false,
                };
            }
        case GET_ORDER_ERROR:
            {
                return {
                    ...state,
                    orderRequest: false,
                    orderError: true,
                    isFetching: false,
                };
            }
        case OPEN_ORDER_MODAL:
            {
                return {
                    ...state,
                    orderOpen: true,

                };
            }
        case CLOSE_ORDER_MODAL:
            {
                return {
                    ...state,
                    orderOpen: false,
                };
            }
        default:
            {
                return state;
            }
    }
};