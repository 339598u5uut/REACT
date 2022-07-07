import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR } from "."
import { URL } from "../../utils/app-api";


export const getOrderRequest = () => {
    // console.log(layersBurgers)
    return fetch(`${URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
                // ingredients: [...layersBurgers.filter((i) => i._id)] 
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Ответ сервера не OK');
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

// усилитель
export function getOrder() {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        getOrderRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res.data
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