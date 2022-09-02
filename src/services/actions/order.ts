import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
} from ".";
import checkResponse from ".";
import { getCookie, URL } from "../../utils/app-api";
import { AppThunk, AppDispatch } from "../reducers/root-reducer";

export type TgetOrderReq = {
    readonly type: typeof GET_ORDER_REQUEST;
}

export type TgetOrderSucc = {
    readonly type: typeof GET_ORDER_SUCCESS;
    order: number;
}

export type TgetOrderError = {
    readonly type: typeof GET_ORDER_ERROR;
}

export type TopenOrderModal = {
    readonly type: typeof OPEN_ORDER_MODAL;
}

export type TcloseOrderModal = {
    readonly type: typeof CLOSE_ORDER_MODAL;
}


//Union
export type TOrderActions =
    TgetOrderReq | TgetOrderSucc | TgetOrderError | TopenOrderModal | TcloseOrderModal;


export function getOrderReq(): TgetOrderReq {
    return {
        type: GET_ORDER_REQUEST
    }
}

export function getOrderSucc(res: { order: { number: number } }): TgetOrderSucc {
    return {
        type: GET_ORDER_SUCCESS,
        order: res.order.number,
    }
}

export function getOrderError(): TgetOrderError {
    return {
        type: GET_ORDER_ERROR
    }
}

export const openOrderModal = (): TopenOrderModal => {
    return {
        type: OPEN_ORDER_MODAL
    }
}

export const closeOrderModal = (): TcloseOrderModal => {
    return {
        type: CLOSE_ORDER_MODAL
    }
}

export function getOrderRequest(numbers: ReadonlyArray<string>) {
    return fetch(`${URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('accessToken') as string
        },
        body: JSON.stringify(numbers)
    })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

export const getOrder: AppThunk = (numbers: ReadonlyArray<string>) => (dispatch: AppDispatch) => {
    dispatch(getOrderReq());
    getOrderRequest(numbers).then(res => {
        if (res && res.success) {
            dispatch(getOrderSucc(res))
        } else {
            dispatch(getOrderError());
        }
    }).catch(err => {
        dispatch(getOrderError());
    })
}

