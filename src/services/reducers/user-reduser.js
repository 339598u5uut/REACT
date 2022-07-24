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
} from "../actions";

const initialState = {
    user: {
        email: '',
        name: '',
        password: ''
    },
    isAuthenticated: false,

    getUserMessage: '',
    getUserSuccess: false,
    getUserRequest: false,
    getUserError: false,

    createUserSuccess: false,
    createUserMessage: '',
    createUserRequest: false,
    createUserError: false,

    loginSuccess: false,
    loginRequest: false,
    loginError: false,

    logoutSuccess: false,
    logoutRequest: false,
    logoutError: false,

    editUserSuccess: false,
    editUserRequest: false,
    editUserError: false,

    refreshTokenRequest: false,
    refreshTokenError: false,

    forgotPasswordSuccess: false,
    forgotPasswordMessage: '',
    forgotPasswordRequest: false,
    forgotPasswordError: false,

    resetPasswordSuccess: false,
    resetPasswordMessage: '',
    resetPasswordRequest: false,
    resetPasswordError: false,

};

export const userReducer = (state = initialState, action) => {
    console.log(action, "action")
    switch (action.type) {
        case GET_USER_REQUEST:
            {
                return {
                    ...state,
                    getUserRequest: true,

                };
            }
        case GET_USER_SUCCESS:
            {
                return {
                    ...state,
                    getUserSuccess: true,
                    getUserRequest: false,
                    getUserError: false,
                    user: {
                        ...state.user,
                        email: action.user.email,
                        name: action.user.name,
                    },
                    isAuthenticated: true,

                };
            }
        case GET_USER_ERROR:
            {
                return {
                    ...state,
                    getUserMessage: action.message,
                    getUserRequest: false,
                    getUserError: true,
                    isAuthenticated: false,
                };
            }
        case DELETE_USER:
            {
                return {
                    ...state,
                    user: initialState.user,

                };
            }
        case EDIT_USER_REQUEST:
            {
                return {
                    ...state,
                    editUserRequest: true,

                };
            }
        case EDIT_USER_SUCCESS:
            {
                return {
                    ...state,
                    editUsersuccess: true,
                    editUserRequest: false,
                    editUserError: false,
                    user: {
                        ...state.user,
                        email: action.user.email,
                        name: action.user.name,
                    },
                };
            }
        case EDIT_USER_ERROR:
            {
                return {
                    ...state,
                    editUserRequest: false,
                    editUserError: true,
                };
            }
        case REFRESH_TOKEN_REQUEST:
            {
                return {
                    ...state,
                    refreshTokenRequest: true,
                    refreshTokenError: false,
                    getUserError: false,
                };
            }
        case REFRESH_TOKEN_SUCCESS:
            {
                return {
                    ...state,
                    refreshTokenRequest: false,
                    isAuthenticated: true
                };
            }
        case REFRESH_TOKEN_ERROR:
            {
                return {
                    ...state,
                    refreshTokenRequest: false,
                    refreshTokenError: true,
                    isAuthenticated: false,
                };
            }
        case GET_FORGOT_PASSWORD_REQUEST:
            {
                return {
                    ...state,
                    forgotPasswordRequest: true,
                };
            }
        case GET_FORGOT_PASSWORD_SUCCESS:
            {
                return {
                    ...state,
                    forgotPasswordRequest: false,
                    forgotPasswordSuccess: true,
                    forgotPasswordMessage: action.message,
                };
            }
        case GET_FORGOT_PASSWORD_ERROR:
            {
                return {
                    ...state,
                    forgotPasswordRequest: false,
                    forgotPasswordError: true,
                };
            }
        case GET_RESET_PASSWORD_REQUEST:
            {
                return {
                    ...state,
                    resetPasswordRequest: true,
                };
            }
        case GET_RESET_PASSWORD_SUCCESS:
            {
                return {
                    ...state,
                    resetPasswordRequest: false,
                    resetPasswordSuccess: true,
                    resetPasswordMessage: action.message,
                };
            }
        case GET_RESET_PASSWORD_ERROR:
            {
                return {
                    ...state,
                    resetPasswordRequest: false,
                    resetPasswordError: true,
                };
            }
        case GET_AUTHORIZATION_REQUEST:
            {
                return {
                    ...state,
                    loginRequest: true,

                };
            }
        case GET_AUTHORIZATION_SUCCESS:
            {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        email: action.user.email,
                        name: action.user.name,
                        password: action.user.password,
                    },
                    isAuthenticated: true,
                    loginSuccess: true,
                    loginRequest: false,
                    loginError: false,


                };
            }
        case GET_AUTHORIZATION_ERROR:
            {
                return {
                    ...state,
                    loginRequest: false,
                    loginError: true,
                };
            }
        case GET_CREATE_USER_REQUEST:
            {
                return {
                    ...state,
                    createUserRequest: true,
                };
            }
        case GET_CREATE_USER_SUCCESS:
            {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        name: action.user.name,
                        email: action.user.email,
                    },
                    isAuthenticated: true,
                    createUserRequest: false,
                    createUserSuccess: true,
                    createUsermessage: action.message,

                };
            }
        case GET_CREATE_USER_ERROR:
            {
                return {
                    ...state,
                    createUserRequest: false,
                    createUserError: true,
                };
            }
        case GET_LOGOUT_REQUEST:
            {
                return {
                    ...state,
                    logoutRequest: true,
                    isAuthenticated: false,
                };
            }
        case GET_LOGOUT_SUCCESS:
            {
                return {
                    ...state,
                    logoutSuccess: true,
                    logoutRequest: false,
                    logoutError: false,
                };
            }
        case GET_LOGOUT_ERROR:
            {
                return {
                    ...state,
                    logoutRequest: false,
                    logoutError: true,
                };
            }
        default:
            return state
    }
}