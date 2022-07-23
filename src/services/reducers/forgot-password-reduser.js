import { GET_FORGOT_REQUEST, GET_FORGOT_SUCCESS, GET_FORGOT_ERROR } from "../actions";

const initialState = {
    success: false,
    message: '',
    forgotRequest: false,
    forgotError: false,
};

export const getForgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FORGOT_REQUEST:
            {
                return {
                    ...state,
                    forgotRequest: true,
                };
            }
        case GET_FORGOT_SUCCESS:
            {
                return {
                    ...state,
                    forgotRequest: false,
                    success: true,
                    message: action.message,
                };
            }
        case GET_FORGOT_ERROR:
            {
                return {
                    ...state,
                    forgotRequest: false,
                    forgotError: true,
                };
            }
        default:
            {
                return state;
            }
    }
};