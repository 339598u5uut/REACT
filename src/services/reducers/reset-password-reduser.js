import { GET_RECOVERY_PASSWORD_REQUEST, GET_RECOVERY_PASSWORD_SUCCESS, GET_RECOVERY_PASSWORD_ERROR } from "../actions";

const initialState = {
    success: false,
    message: '',
    forgotRequest: false,
    forgotError: false,
};

export const getRecoveryPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECOVERY_PASSWORD_REQUEST:
            {
                return {
                    ...state,
                    recoveryRequest: true,
                };
            }
        case GET_RECOVERY_PASSWORD_SUCCESS:
            {
                return {
                    ...state,
                    recoveryRequest: false,
                    success: true,
                    message: action.message,
                };
            }
        case GET_RECOVERY_PASSWORD_ERROR:
            {
                return {
                    ...state,
                    recoveryRequest: false,
                    recoveryError: true,
                };
            }
        default:
            {
                return state;
            }
    }
};