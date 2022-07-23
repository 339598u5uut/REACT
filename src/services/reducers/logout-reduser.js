import { GET_LOGOUT_REQUEST, GET_LOGOUT_SUCCESS, GET_LOGOUT_ERROR } from "../actions";

const initialState = {

    success: false,
    logoutRequest: false,
    logoutError: false,
    isAuthenticated: false,

};

export const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
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
                    success: true,
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