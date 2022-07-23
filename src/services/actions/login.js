import { GET_AUTHORIZATION_REQUEST, GET_AUTHORIZATION_SUCCESS, GET_AUTHORIZATION_ERROR } from ".";
import { URL } from "../../utils/app-api";
import checkResponse from ".";
import { getCookie } from "../../utils/app-api";
import { setCookie } from "../../utils/app-api";

export function getLoginReq() {
    return {
        type: GET_AUTHORIZATION_REQUEST,
    }
}

export function getLoginSucc(user) {
    return {
        type: GET_AUTHORIZATION_SUCCESS,
        user,
    }
}

export function getLoginError() {
    return {
        type: GET_AUTHORIZATION_ERROR
    }
}


export const getLoginRequest = form => {
    return fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            Authorization: 'Bearer ' + getCookie('accessToken'),
            body: JSON.stringify(form)
        })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

export function login(form) {
    return function(dispatch) {

        dispatch(getLoginReq());
        getLoginRequest(form)
            .then(res => {
                if (res && res.success) {
                    console.log(res, 'res авторизация')
                    dispatch(getLoginSucc(res.user));
                    localStorage.setItem('refreshToken', res.refreshToken);
                    setCookie('accessToken', res.accessToken)

                } else {
                    dispatch(getLoginError());
                }
            }).catch(err => {
                dispatch(getLoginError());
            })
    }
}