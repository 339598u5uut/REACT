import { GET_LOGOUT_REQUEST, GET_LOGOUT_SUCCESS, GET_LOGOUT_ERROR } from ".";
import { URL } from "../../utils/app-api";
import checkResponse from ".";
import { getCookie } from "../../utils/app-api";
import { deleteCookie } from "../../utils/app-api";

export function getLogoutReq() {
    return {
        type: GET_LOGOUT_REQUEST,
    }
}

export function getLogoutSucc() {
    return {
        type: GET_LOGOUT_SUCCESS,
    }
}

export function getLogoutError() {
    return {
        type: GET_LOGOUT_ERROR
    }
}


export const getLogoutRequest = () => {
    return fetch(`${URL}/auth/logout`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            })
        })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

export function logout() {
    return function(dispatch) {
        console.log(localStorage.getItem('refreshToken'), 'localStorage.getItem')
        dispatch(getLogoutReq());
        getLogoutRequest()
            .then(res => {
                if (res && res.success) {
                    console.log(res, 'res Logout')
                    dispatch(getLogoutSucc(res));
                    deleteCookie('accessToken');
                    localStorage.removeItem('refreshToken');
                } else {
                    dispatch(getLogoutError());
                }
            }).catch(err => {
                dispatch(getLogoutError());
            })
    }
}