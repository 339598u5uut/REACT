import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR } from "."
import { URL } from "../../utils/app-api";



export function getOrderRequest(numbers) {
    return fetch(`${URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(numbers)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Сервер не отвечает');
            }
            return res.json();
        })
        .then(data => {
            return data;
        })
        .catch(e => {
            return Promise.reject(e)
        })
};

export function getOrder(numbers) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        getOrderRequest(numbers).then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res.order.number
                })
            } else {
                dispatch({
                    type: GET_ORDER_ERROR
                })
            }
        }).catch(err => {
            dispatch({
                type: GET_ORDER_ERROR
            })
        })
    }
}