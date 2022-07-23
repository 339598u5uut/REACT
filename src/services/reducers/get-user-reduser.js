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
    REFRESH_TOKEN_ERROR
} from "../actions";

const initialState = {
    user: { email: '', name: '', password: '' },
    message: '',
    success: false,
    userRequest: false,
    userError: false,
    isAuthenticated: false,

    editUserSuccess: false,
    editUserRequest: false,
    editUserError: false,

    refreshTokenRequest: false,
    refreshTokenError: false,
    getUserError: false,

};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            {
                return {
                    ...state,
                    userRequest: true,

                };
            }
        case GET_USER_SUCCESS:
            {
                return {
                    ...state,
                    success: true,
                    userRequest: false,
                    userError: false,
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
                    message: action.message,
                    userRequest: false,
                    userError: true,
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
        default:
            return state
    }
}