import { GET_RECOVERY_PASSWORD_REQUEST, GET_RECOVERY_PASSWORD_SUCCESS, GET_RECOVERY_PASSWORD_ERROR } from ".";
import checkResponse from ".";
import { URL } from "../../utils/app-api";

export function getRecoveryPasswordReq() {
    return {
        type: GET_RECOVERY_PASSWORD_REQUEST,
    }
}

export function getRecoveryPasswordSucc(res) {
    return {
        type: GET_RECOVERY_PASSWORD_SUCCESS,
        message: res.message
    }
}

export function getRecoveryPasswordError() {
    return {
        type: GET_RECOVERY_PASSWORD_ERROR
    }
}


export function getRecoveryPasswordRequest(email) {
    return fetch(`${URL}/password-reset/reset`, {
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
export function recoveryPassword(email) {
    return function(dispatch) {

        dispatch(getRecoveryPasswordReq());
        getRecoveryPasswordRequest(email)
            .then(res => {
                if (res && res.success) {
                    dispatch(getRecoveryPasswordSucc(res));
                } else {
                    dispatch(getRecoveryPasswordError());
                }
            }).catch(err => {
                dispatch(getRecoveryPasswordError());
            })
    }
}