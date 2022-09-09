import { userReducer, initialState } from "./user-reduser";
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

describe('userReducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(
            userReducer((initialState), {
                type: GET_USER_REQUEST
            })
        ).toEqual({...initialState, getUserRequest: true })
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect(
            userReducer((initialState), {
                type: GET_USER_SUCCESS,
                user: { "email": 1, "name": 2, "password": '' },
            })
        ).toEqual({
            ...initialState,
            getUserSuccess: true,
            user: { "email": 1, "name": 2, "password": '' },
            isAuthenticated: true,
        })
    })

    it('should handle GET_USER_ERROR', () => {
        expect(
            userReducer((initialState), {
                type: GET_USER_ERROR,
                getUserMessage: undefined
            })
        ).toEqual({
            ...initialState,
            getUserError: true,
            isAuthenticated: false,
            getUserMessage: undefined
        })
    })

    it('should handle DELETE_USER', () => {
        expect(
            userReducer((initialState), {
                type: DELETE_USER
            })
        ).toEqual({...initialState })
    })

    it('should handle EDIT_USER_REQUEST', () => {
        expect(
            userReducer((initialState), {
                type: EDIT_USER_REQUEST
            })
        ).toEqual({
            ...initialState,
            editUserRequest: true,
        })
    })

    it('should handle EDIT_USER_SUCCESS', () => {
        expect(
            userReducer((initialState), {
                type: EDIT_USER_SUCCESS,
                user: { "email": 1, "name": 2, "password": '' },
            })
        ).toEqual({
            ...initialState,
            editUserSuccess: true,
            user: { "email": 1, "name": 2, "password": '' },
        })
    })

    it('should handle EDIT_USER_ERROR', () => {
        expect(
            userReducer((initialState), {
                type: EDIT_USER_ERROR,
            })
        ).toEqual({
            ...initialState,
            editUserError: true,
        })
    })

    it('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(
            userReducer((initialState), {
                type: REFRESH_TOKEN_REQUEST,
            })
        ).toEqual({
            ...initialState,
            refreshTokenRequest: true,
        })
    })

    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(
            userReducer((initialState), {
                type: REFRESH_TOKEN_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            isAuthenticated: true,
        })
    })

    it('should handle REFRESH_TOKEN_ERROR', () => {
        expect(
            userReducer((initialState), {
                type: REFRESH_TOKEN_ERROR,
            })
        ).toEqual({
            ...initialState,
            refreshTokenError: true,
            isAuthenticated: false,
        })
    })

    it('should handle GET_FORGOT_PASSWORD_REQUEST', () => {
        expect(
            userReducer((initialState), {
                type: GET_FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual({
            ...initialState,
            forgotPasswordRequest: true,
        })
    })

    it('should handle GET_FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            userReducer((initialState), {
                type: GET_FORGOT_PASSWORD_SUCCESS,
                message: undefined,
            })
        ).toEqual({
            ...initialState,
            forgotPasswordSuccess: true,
            forgotPasswordMessage: undefined,
        })
    })

    it('should handle GET_FORGOT_PASSWORD_ERROR', () => {
        expect(
            userReducer((initialState), {
                type: GET_FORGOT_PASSWORD_ERROR,
            })
        ).toEqual({
            ...initialState,
            forgotPasswordError: true,
        })
    })

    it('should handle GET_RESET_PASSWORD_REQUEST', () => {
        expect(
            userReducer((initialState), {
                type: GET_RESET_PASSWORD_REQUEST,
            })
        ).toEqual({
            ...initialState,
            resetPasswordRequest: true,
        })
    })

    it('should handle GET_RESET_PASSWORD_SUCCESS', () => {
        expect(
            userReducer((initialState), {
                type: GET_RESET_PASSWORD_SUCCESS,
                message: undefined,
            })
        ).toEqual({
            ...initialState,
            resetPasswordSuccess: true,
            resetPasswordMessage: undefined,
        })
    })

    it('should handle GET_RESET_PASSWORD_ERROR', () => {
        expect(
            userReducer((initialState), {
                type: GET_RESET_PASSWORD_ERROR,
            })
        ).toEqual({
            ...initialState,
            resetPasswordError: true,
        })
    })

    it('should handle GET_AUTHORIZATION_REQUEST', () => {
        expect(
            userReducer((initialState), {
                type: GET_AUTHORIZATION_REQUEST,
            })
        ).toEqual({
            ...initialState,
            loginRequest: true,
        })
    })

    it('should handle GET_AUTHORIZATION_SUCCESS', () => {
        expect(
            userReducer((initialState), {
                type: GET_AUTHORIZATION_SUCCESS,
                user: { "email": 1, "name": 2, "password": '' },
            })
        ).toEqual({
            ...initialState,
            user: { "email": 1, "name": 2, "password": '' },
            isAuthenticated: true,
            loginSuccess: true,

        })
    })

    it('should handle GET_AUTHORIZATION_ERROR', () => {
        expect(
            userReducer((initialState), {
                type: GET_AUTHORIZATION_ERROR,
            })
        ).toEqual({
            ...initialState,
            loginError: true,
        })
    })

    it('should handle GET_LOGOUT_REQUEST', () => {
        expect(
            userReducer((initialState), {
                type: GET_LOGOUT_REQUEST,
            })
        ).toEqual({
            ...initialState,
            logoutRequest: true,
            isAuthenticated: false,
        })
    })

    it('should handle GET_LOGOUT_SUCCESS', () => {
        expect(
            userReducer((initialState), {
                type: GET_LOGOUT_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            logoutSuccess: true,
            isAuthenticated: false,
        })
    })

    it('should handle GET_LOGOUT_ERROR', () => {
        expect(
            userReducer((initialState), {
                type: GET_LOGOUT_ERROR,
            })
        ).toEqual({
            ...initialState,
            logoutError: true,
        })
    })

    it('should handle GET_CREATE_USER_REQUEST', () => {
        expect(
            userReducer((initialState), {
                type: GET_CREATE_USER_REQUEST,
            })
        ).toEqual({
            ...initialState,
            createUserRequest: true,
        })
    })

    it('should handle GET_CREATE_USER_SUCCESS', () => {
        expect(
            userReducer((initialState), {
                type: GET_CREATE_USER_SUCCESS,
                user: { "email": 1, "name": 2, "password": '' },
            })
        ).toEqual({
            ...initialState,
            user: { "email": 1, "name": 2, "password": '' },
            isAuthenticated: true,
            createUserSuccess: true,
        })
    })

    it('should handle GET_CREATE_USER_ERROR', () => {
        expect(
            userReducer((initialState), {
                type: GET_CREATE_USER_ERROR,
                message: undefined,
            })
        ).toEqual({
            ...initialState,
            createUserError: true,
            createUserMessage: undefined,
        })
    })
})