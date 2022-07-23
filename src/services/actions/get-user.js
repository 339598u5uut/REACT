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
    // GET_FORGOT_REQUEST,
    // GET_FORGOT_SUCCESS,
    // GET_FORGOT_ERROR,
} from ".";
import checkResponse from ".";
import { URL } from "../../utils/app-api";
import { getCookie } from "../../utils/app-api";
import { deleteCookie } from "../../utils/app-api";
import { setCookie } from "../../utils/app-api";


export function getUserReq() {
    return {
        type: GET_USER_REQUEST,
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


//REFRESH
export function tokenRefreshReq() {
    return {
        type: REFRESH_TOKEN_REQUEST,
    }
}

export function tokenRefreshSucc() {
    return {
        type: REFRESH_TOKEN_SUCCESS,
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
            console.log(data, 'data')
            if (data) {
                dispatch(getUserSucc(data.user))
            }

            if (data.message === "jwt expired") {
                console.log(data.message === "jwt expired", 'data.message === "jwt expired"')

                fetch(`${URL}/auth/token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "token": localStorage.getItem('refreshToken') }),
                    })
                    .then(async(res) => {
                        dispatch(tokenRefreshSucc());
                        const data = await res.json();
                        setCookie('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);

                        fetch(`${URL}/auth/user`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: getCookie('accessToken')
                            },
                        })
                    })
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



// export const tokenRefreshRequest = async() => {
//     return await fetch(`${URL}/auth/token`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
//     })

// };

// const tokenRefresh = () => (dispatch) => {
//     dispatch(tokenRefreshReq())
//     tokenRefreshRequest()
//         .then(async(res) => {
//             dispatch(tokenRefreshSucc());
//             const data = await res.json();
//             setCookie('accessToken', data.accessToken);
//             console.log(res, 'res')

//             console.log(data, 'data')
//             localStorage.setItem('refreshToken', data.refreshToken);
//             dispatch();
//         })
//         .catch(err => {
//             dispatch(tokenRefreshError());
//         })
// };



// //EDIT
export function editUserReq() {
    return {
        type: EDIT_USER_REQUEST,
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
        type: EDIT_USER_ERROR,

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



// Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDZhMWI4NDJkMzRhMDAxYzI3OWUyNiIsImlhdCI6MTY1ODUwMDI0MSwiZXhwIjoxNjU4NTAxNDQxfQ.0j2uu4wXirt80lscfgC3dc2STfepxhCwC3fdx6te2GY


//middleware
// export const getUser = () => (dispatch) => {
//     dispatch(getUserReq());
//     getUserRequest()
//         .then(async response => {
//             const isJson = response.headers.get('content-type').includes('application/json');
//             const data = isJson ? await response.json() : null;
//             console.log(data, 'data')


//             if (data.message === "jwt expired") {
//                 console.log(data.message === "jwt expired", 'data.message === "jwt expired"')

//                 fetch(`${URL}/auth/token`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({ "token": localStorage.getItem('refreshToken') }),
//                     })
//                     .then(async(res) => {
//                         dispatch(tokenRefreshSucc());
//                         const data = await res.json();
//                         setCookie('accessToken', data.accessToken);
//                         console.log(res, 'res')

//                         console.log(data, 'data')
//                         localStorage.setItem('refreshToken', data.refreshToken);

//                         fetch(`${URL}/auth/user`, {
//                             method: 'GET',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                                 Authorization: getCookie('accessToken')
//                             },
//                         })
//                     })
//             }
//             if (!response.ok) {
//                 const error = (data && data.message) || response.status;
//                 return Promise.reject(error);
//             }
//         })
//         .catch(err => {
//             dispatch(tokenRefreshError());
//         })
// }