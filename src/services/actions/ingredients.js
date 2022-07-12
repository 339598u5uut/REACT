import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR } from "."
import { URL } from "../../utils/app-api";
import checkResponse from ".";

export const getIngredientsRequest = () => {
    return fetch(`${URL}/ingredients`)
        .then(checkResponse)
        .then(data => {
            return data;
        })
        .catch(e => {
            return Promise.reject(e)
        })
};

export function getIngredientsReq() {
    return {
        type: GET_INGREDIENTS_REQUEST,
    }
}

export function getIngredientsSucc(res) {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data
    }
}

export function getIngredientsError() {
    return {
        type: GET_INGREDIENTS_ERROR
    }
}

// усилитель
export function ingredients() {
    return function(dispatch) {

        dispatch(getIngredientsReq());
        getIngredientsRequest()
            .then(res => {
                if (res && res.success) {
                    dispatch(getIngredientsSucc(res));
                } else {
                    dispatch(getIngredientsError());
                }
            }).catch(err => {
                dispatch(getIngredientsError());
            })
    }
}