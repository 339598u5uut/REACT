import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    DELETE_USER,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR,
    GET_FORGOT_PASSWORD_REQUEST,
    GET_FORGOT_PASSWORD_SUCCESS,
    GET_FORGOT_PASSWORD_ERROR,
    GET_RESET_PASSWORD_REQUEST,
    GET_RESET_PASSWORD_SUCCESS,
    GET_RESET_PASSWORD_ERROR,
    GET_AUTHORIZATION_REQUEST,
    GET_AUTHORIZATION_SUCCESS,
    GET_AUTHORIZATION_ERROR,
    GET_LOGOUT_REQUEST,
    GET_LOGOUT_SUCCESS,
    GET_LOGOUT_ERROR,
    GET_CREATE_USER_REQUEST,
    GET_CREATE_USER_SUCCESS,
    GET_CREATE_USER_ERROR,

} from ".";
import checkResponse from ".";
import { URL, getCookie, deleteCookie, setCookie } from "../../utils/app-api";

//REGISTER-USER
export function getCreateUserReq() {
    return {
        type: GET_CREATE_USER_REQUEST
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

// middleware
export function createUser(form) {
    return function(dispatch) {

        dispatch(getCreateUserReq());
        getCreateUserRequest(form)
            .then(res => {
                if (res && res.success) {
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



//LOGIN
export function getLoginReq() {
    return {
        type: GET_AUTHORIZATION_REQUEST
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


//GET-USER
export function getUserReq() {
    return {
        type: GET_USER_REQUEST
    }
}

export function getUserSucc(user) {
    return {
        type: GET_USER_SUCCESS,
        user,
    }
}

export function getUserError(res) {
    return {
        type: GET_USER_ERROR,
        message: res.message,
    }
}

export function deleteUser() {
    return {
        type: DELETE_USER
    }
}

export const getUserRequest = () => {
    return fetch(`${URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('accessToken')
        },
    })

}

//REFRESH-TOKEN
export function tokenRefreshReq() {
    return {
        type: REFRESH_TOKEN_REQUEST
    }
}

export function tokenRefreshSucc() {
    return {
        type: REFRESH_TOKEN_SUCCESS
    }
}

export function tokenRefreshError() {
    return {
        type: REFRESH_TOKEN_ERROR
    }
}

//middleware 
export const getUser = () => (dispatch) => {
    dispatch(getUserReq());
    getUserRequest()
        .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json');
            const data = isJson ? await response.json() : null;
            if (data.success) {
                dispatch(getUserSucc(data.user));
            }


            if (data.message === "jwt expired") {
                try {
                    const authTokenResponse = await fetch(`${URL}/auth/token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "token": localStorage.getItem('refreshToken') }),
                    })
                    const authToken = await authTokenResponse.json();
                    dispatch(tokenRefreshSucc());
                    setCookie('accessToken', authToken?.accessToken);
                    localStorage.setItem('refreshToken', authToken?.refreshToken);

                    const data1 = await fetch(`${URL}/auth/user`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: getCookie('accessToken')
                        },
                    })
                    const data2 = await data1.json();
                    if (data2) {
                        dispatch(getUserSucc(data2.user));
                    }
                } catch (err) {
                    dispatch(tokenRefreshError());
                    dispatch(getUserError(err));
                }
            }
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        })
        .catch(err => {
            dispatch(tokenRefreshError());
            dispatch(getUserError(err));
        })
}

//EDIT-USER
export function editUserReq() {
    return {
        type: EDIT_USER_REQUEST
    }
}

export function editUserSucc(user) {
    return {
        type: EDIT_USER_SUCCESS,
        user,
    }
}

export function editUserError() {
    return {
        type: EDIT_USER_ERROR
    }
}

export const editUserRequest = ({ name, email, password }) => {
    return fetch(`${URL}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getCookie('accessToken')
            },
            body: JSON.stringify({ name, email, password }),
        })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

export function editUser(form) {
    return function(dispatch) {
        dispatch(editUserReq())
        editUserRequest(form)
            .then(res => {
                if (res && res.success) {
                    dispatch(editUserSucc(res.user));
                } else {
                    dispatch(editUserError());
                }
            }).catch(err => {
                dispatch(editUserError());
            })
    }
}


//FORGOT-PASSWORD
export function getForgotPasswordReq() {
    return {
        type: GET_FORGOT_PASSWORD_REQUEST
    }
}

export function getForgotPasswordSucc(res) {
    return {
        type: GET_FORGOT_PASSWORD_SUCCESS,
        message: res.message
    }
}

export function getForgotPasswordError() {
    return {
        type: GET_FORGOT_PASSWORD_ERROR
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

// middleware
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

//RESET-PASSWORD
export function getRecoveryPasswordReq() {
    return {
        type: GET_RESET_PASSWORD_REQUEST
    }
}

export function getRecoveryPasswordSucc(res) {
    return {
        type: GET_RESET_PASSWORD_SUCCESS,
        message: res.message
    }
}

export function getRecoveryPasswordError() {
    return {
        type: GET_RESET_PASSWORD_ERROR
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

// middleware
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

//LOGOUT
export function getLogoutReq() {
    return {
        type: GET_LOGOUT_REQUEST
    }
}

export function getLogoutSucc() {
    return {
        type: GET_LOGOUT_SUCCESS
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

//middleware
export function logout() {
    return function(dispatch) {
        dispatch(getLogoutReq());
        getLogoutRequest()
            .then(res => {
                if (res && res.success) {
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