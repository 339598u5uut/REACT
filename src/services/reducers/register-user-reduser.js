import { GET_CREATE_USER_REQUEST, GET_CREATE_USER_SUCCESS, GET_CREATE_USER_ERROR } from "../actions";

const initialState = {
    user: {
        name: '',
        email: '',
        password: '',
    },
    success: false,
    message: '',
    createUserRequest: false,
    createUserError: false,
    isAuthenticated: false,
};

export const getCreateUserReducer = (state = initialState, action) => {
    switch (action.type) {
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
                    createUserRequest: false,
                    success: true,
                    message: action.message,
                    user: {
                        ...state.user,
                        name: action.user.name,
                        email: action.user.email,
                    },
                    isAuthenticated: true,
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
        default:
            {
                return state;
            }
    }
};