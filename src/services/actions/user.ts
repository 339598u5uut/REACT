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
import { TUser } from "../../utils/types";
import { AppDispatch, AppThunk } from "../reducers/root-reducer";

export type TgetCreateUserReq = {
    readonly type: typeof GET_CREATE_USER_REQUEST;
}

export type TgetCreateUserSucc = {
    readonly type: typeof GET_CREATE_USER_SUCCESS;
    readonly user: TUser;
}

export type TgetCreateUserError = {
    readonly type: typeof GET_CREATE_USER_ERROR;
    message: string;
}

//REGISTER-USER
export function getCreateUserReq(): TgetCreateUserReq {
    return {
        type: GET_CREATE_USER_REQUEST
    }
}

export function getCreateUserSucc(user: TUser): TgetCreateUserSucc {
    return {
        type: GET_CREATE_USER_SUCCESS,
        user,
    }
}

export function getCreateUserError(message: string): TgetCreateUserError {
    return {
        type: GET_CREATE_USER_ERROR,
        message,
    }
}


export function getCreateUserRequest(form: TUser) {
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
export const createUser: AppThunk = (form: TUser) => (dispatch: AppDispatch) => {
    dispatch(getCreateUserReq());
    getCreateUserRequest(form)
        .then(res => {
            if (res && res.success) {
                dispatch(getCreateUserSucc(res.user));
                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie('accessToken', res.accessToken)
            } else {
                dispatch(getCreateUserError(res.message));
            }
        }).catch(err => {
            dispatch(getCreateUserError(err.message));
        })
}



export type TgetLoginReq = {
    readonly type: typeof GET_AUTHORIZATION_REQUEST;
}

export type TgetLoginSucc = {
    readonly type: typeof GET_AUTHORIZATION_SUCCESS;
    user: TUser;
}
export type TgetLoginError = {
    readonly type: typeof GET_AUTHORIZATION_ERROR;
}

//LOGIN
export function getLoginReq(): TgetLoginReq {
    return {
        type: GET_AUTHORIZATION_REQUEST
    }
}

export function getLoginSucc(user: TUser): TgetLoginSucc {
    return {
        type: GET_AUTHORIZATION_SUCCESS,
        user,
    }
}

export function getLoginError(): TgetLoginError {
    return {
        type: GET_AUTHORIZATION_ERROR
    }
}

export const getLoginRequest = (form: TUser) => {
    return fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken'),
        },
        body: JSON.stringify(form)
    })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

export const login: AppThunk = (form: TUser) => (dispatch: AppDispatch) => {
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




export type TgetUserReq = {
    readonly type: typeof GET_USER_REQUEST;
}

export type TgetUserSucc = {
    readonly type: typeof GET_USER_SUCCESS;
    user: TUser;
}

export type TgetUserError = {
    readonly type: typeof GET_USER_ERROR;
    message: string;
}

export type TdeleteUser = {
    readonly type: typeof DELETE_USER;
}

//GET-USER
export function getUserReq(): TgetUserReq {
    return {
        type: GET_USER_REQUEST
    }
}

export function getUserSucc(user: TUser) {
    return {
        type: GET_USER_SUCCESS,
        user,
    }
}

export function getUserError(message: string): TgetUserError {
    return {
        type: GET_USER_ERROR,
        message,
    }
}

export function deleteUser(): TdeleteUser {
    return {
        type: DELETE_USER
    }
}

export const getUserRequest = () => {
    return fetch(`${URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('accessToken') as string,
        },
    })

}



export type TtokenRefreshReq = {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export type TtokenRefreshSucc = {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export type TtokenRefreshError = {
    readonly type: typeof REFRESH_TOKEN_ERROR;
}

//REFRESH-TOKEN
export function tokenRefreshReq(): TtokenRefreshReq {
    return {
        type: REFRESH_TOKEN_REQUEST
    }
}

export function tokenRefreshSucc(): TtokenRefreshSucc {
    return {
        type: REFRESH_TOKEN_SUCCESS
    }
}

export function tokenRefreshError(): TtokenRefreshError {
    return {
        type: REFRESH_TOKEN_ERROR
    }
}

//middleware 
export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getUserReq());
    getUserRequest()
        .then(async response => {
            const isJson = response.headers.get('content-type')!.includes('application/json');
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
                            Authorization: getCookie('accessToken') as string,
                        },
                    })
                    const data2 = await data1.json();
                    if (data2) {
                        dispatch(getUserSucc(data2.user));
                    }
                } catch (err) {

                    dispatch(tokenRefreshError());
                    // dispatch(getUserError(err))

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




export type TeditUserReq = {
    readonly type: typeof EDIT_USER_REQUEST;
}

export type TeditUserSucc = {
    readonly type: typeof EDIT_USER_SUCCESS;
    user: TUser;
}

export type TeditUserError = {
    readonly type: typeof EDIT_USER_ERROR;
}

//EDIT-USER
export function editUserReq(): TeditUserReq {
    return {
        type: EDIT_USER_REQUEST
    }
}

export function editUserSucc(user: TUser):TeditUserSucc {
    return {
        type: EDIT_USER_SUCCESS,
        user,
    }
}

export function editUserError(): TeditUserError {
    return {
        type: EDIT_USER_ERROR
    }
}

export const editUserRequest = (form: TUser) => {
    return fetch(`${URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('accessToken') as string
        },
        body: JSON.stringify(form),
    })
        .then(checkResponse)
        .then(data => {
            return data;
        })
};

export const editUser: AppThunk = (form: TUser) => (dispatch: AppDispatch) => {
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


export type TgetForgotPasswordReq = {
    readonly type: typeof GET_FORGOT_PASSWORD_REQUEST;
}

export type TgetForgotPasswordSucc = {
    readonly type: typeof GET_FORGOT_PASSWORD_SUCCESS;
    readonly message: string;
}

export type TgetForgotPasswordError = {
    readonly type: typeof GET_FORGOT_PASSWORD_ERROR;
}

//FORGOT-PASSWORD
export function getForgotPasswordReq(): TgetForgotPasswordReq {
    return {
        type: GET_FORGOT_PASSWORD_REQUEST
    }
}

export function getForgotPasswordSucc(message: string): TgetForgotPasswordSucc {
    return {
        type: GET_FORGOT_PASSWORD_SUCCESS,
        message
    }
}

export function getForgotPasswordError(): TgetForgotPasswordError {
    return {
        type: GET_FORGOT_PASSWORD_ERROR
    }
}

export function getForgotPasswordRequest(email: Pick<TUser, 'email'>) {
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
export const forgotPassword: AppThunk = (email: Pick<TUser, 'email'>) => (dispatch: AppDispatch) => {
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


export type TgetRecoveryPasswordReq = {
    readonly type: typeof GET_RESET_PASSWORD_REQUEST;
}

export type TgetRecoveryPasswordSucc = {
    readonly type: typeof GET_RESET_PASSWORD_SUCCESS;
    readonly message: string;
}

export type TgetRecoveryPasswordError = {
    readonly type: typeof GET_RESET_PASSWORD_ERROR;
}

//RESET-PASSWORD
export function getRecoveryPasswordReq() {
    return {
        type: GET_RESET_PASSWORD_REQUEST
    }
}

export function getRecoveryPasswordSucc(message: string): TgetRecoveryPasswordSucc {
    return {
        type: GET_RESET_PASSWORD_SUCCESS,
        message
    }
}

export function getRecoveryPasswordError(): TgetRecoveryPasswordError {
    return {
        type: GET_RESET_PASSWORD_ERROR
    }
}

export function getRecoveryPasswordRequest(email: Pick<TUser, 'email'>) {
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
export const recoveryPassword: AppThunk = (email: Pick<TUser, 'email'>) => (dispatch: AppDispatch) => {
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



export type TgetLogoutReq = {
    readonly type: typeof GET_LOGOUT_REQUEST;
}

export type TgetLogoutSucc = {
    readonly type: typeof GET_LOGOUT_SUCCESS;
}

export type TgetLogoutError = {
    readonly type: typeof GET_LOGOUT_ERROR;
}

//LOGOUT
export function getLogoutReq(): TgetLogoutReq {
    return {
        type: GET_LOGOUT_REQUEST
    }
}

export function getLogoutSucc(): TgetLogoutSucc {
    return {
        type: GET_LOGOUT_SUCCESS
    }
}

export function getLogoutError(): TgetLogoutError {
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
export const logout: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getLogoutReq());
    getLogoutRequest()
        .then(res => {
            if (res && res.success) {
                dispatch(getLogoutSucc());
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
            } else {
                dispatch(getLogoutError());
            }
        }).catch(err => {
            dispatch(getLogoutError());
        })
}

export type TUserActions =
    TgetCreateUserReq | TgetCreateUserSucc | TgetCreateUserError | TgetLoginReq | TgetLoginSucc | TgetLoginError | TgetUserReq | TgetUserSucc | TgetUserError |
    TdeleteUser | TtokenRefreshReq | TtokenRefreshSucc | TtokenRefreshError | TeditUserReq | TeditUserSucc | TeditUserError | TgetForgotPasswordReq | TgetForgotPasswordSucc | TgetForgotPasswordError | TgetRecoveryPasswordReq | TgetRecoveryPasswordSucc | TgetRecoveryPasswordError | TgetLogoutReq | TgetLogoutSucc | TgetLogoutError;