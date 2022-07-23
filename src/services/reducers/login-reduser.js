import { GET_AUTHORIZATION_REQUEST, GET_AUTHORIZATION_SUCCESS, GET_AUTHORIZATION_ERROR } from "../actions";

const initialState = {

    user: { email: '', name: '', password: '' },
    success: false,
    loginRequest: false,
    loginError: false,
    isAuthenticated: false,

};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
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
                    success: true,
                    loginRequest: false,
                    loginError: false,
                    user: {
                        ...state.user,
                        email: action.user.email,
                        name: action.user.name,
                        password: action.user.password,
                    },
                    isAuthenticated: true,

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
        default:
            return state
    }
}