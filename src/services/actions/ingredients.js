import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR } from "."
import { URL } from "../../utils/app-api";


export const getIngredientsRequest = () => {
    return fetch(`${URL}/ingredients`)
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
export function ingredients() {
    return function(dispatch) {

        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getIngredientsRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                })
            } else {
                dispatch({
                    type: GET_INGREDIENTS_ERROR
                })
            }
        }).catch(err => {
            dispatch({
                type: GET_INGREDIENTS_ERROR
            })
        })
    }
}