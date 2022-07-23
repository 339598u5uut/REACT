import { GET_CREATE_USER_REQUEST, GET_CREATE_USER_SUCCESS, GET_CREATE_USER_ERROR } from ".";
import checkResponse from ".";
import { URL } from "../../utils/app-api";
import { getCookie } from "../../utils/app-api";
import { setCookie } from "../../utils/app-api";

export function getCreateUserReq() {
    return {
        type: GET_CREATE_USER_REQUEST,
    }
}

export function getCreateUserSucc(user) {
    return {
        type: GET_CREATE_USER_SUCCESS,
        user,
    }
}

export function getCreateUserError() {
    return {
        type: GET_CREATE_USER_ERROR
    }
}


export function getCreateUserRequest(form) {
    return fetch(`${URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify(form)
        })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

// усилитель
export function createUser(form) {
    return function(dispatch) {

        dispatch(getCreateUserReq());
        getCreateUserRequest(form)
            .then(res => {
                if (res && res.success) {
                    console.log(res, 'res регистрация')
                    dispatch(getCreateUserSucc(res.user));
                    localStorage.setItem('refreshToken', res.refreshToken);
                    setCookie('accessToken', res.accessToken)
                } else {
                    dispatch(getCreateUserError());
                }
            }).catch(err => {
                dispatch(getCreateUserError());
            })
    }
}