import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    CLEAR_CONSTRUCTOR,
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL
} from ".";
import checkResponse from ".";
import { URL } from "../../utils/app-api";

export function getOrderReq() {
    return {
        type: GET_ORDER_REQUEST
    }
}

export function getOrderSucc(res) {
    return {
        type: GET_ORDER_SUCCESS,
        order: res.order.number
    }
}

export function afterOrderClearConstructor() {
    return {
        type: CLEAR_CONSTRUCTOR
    }
}

export function getOrderError() {
    return {
        type: GET_ORDER_ERROR
    }
}

export function getOrderRequest(numbers) {
    return fetch(`${URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(numbers)
        })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

export function getOrder(numbers) {
    return function(dispatch) {
        dispatch(getOrderReq());
        getOrderRequest(numbers).then(res => {
            if (res && res.success) {
                dispatch(getOrderSucc(res))
                    .then(dispatch(afterOrderClearConstructor()));
            } else {
                dispatch(getOrderError());
            }
        }).catch(err => {
            dispatch(getOrderError());
        })
    }
}

export const openOrderModal = () => {
    return {
        type: OPEN_ORDER_MODAL
    }
}

export const closeOrderModal = () => {
    return {
        type: CLOSE_ORDER_MODAL
    }
}