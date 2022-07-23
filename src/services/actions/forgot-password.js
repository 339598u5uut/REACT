import { GET_FORGOT_REQUEST, GET_FORGOT_SUCCESS, GET_FORGOT_ERROR } from ".";
import checkResponse from ".";
import { URL } from "../../utils/app-api";


export function getForgotPasswordReq() {
    return {
        type: GET_FORGOT_REQUEST,
    }
}

export function getForgotPasswordSucc(res) {
    return {
        type: GET_FORGOT_SUCCESS,
        message: res.message
    }
}

export function getForgotPasswordError() {
    return {
        type: GET_FORGOT_ERROR
    }
}


export function getForgotPasswordRequest(email) {
    return fetch(`${URL}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

// усилитель
export function forgotPassword(email) {
    return function(dispatch) {

        dispatch(getForgotPasswordReq());
        getForgotPasswordRequest(email)
            .then(res => {
                if (res && res.success) {
                    dispatch(getForgotPasswordSucc(res));

                } else {
                    dispatch(getForgotPasswordError());
                }
            }).catch(err => {
                dispatch(getForgotPasswordError());
            })
    }
}