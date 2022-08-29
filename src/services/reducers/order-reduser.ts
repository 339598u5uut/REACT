import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL } from "../actions";
import { TOrderActions } from "../actions/order";

export type TOrderState = {
    order: number;
    orderRequest: boolean;
    orderError: boolean;
    isFetching: boolean;
    orderOpen: boolean;
}

const initialState: TOrderState = {
    order: 0,
    orderRequest: false,
    orderError: false,
    isFetching: false,
    orderOpen: false,
};

export const getNumberOrderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            {
                return {
                    ...initialState,
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