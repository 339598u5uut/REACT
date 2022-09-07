import { userReducer } from "./user-reduser";
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
        expect(userReducer(undefined, {})).toEqual({
            user: {
                email: '',
                name: '',
                password: ''
            },
            isAuthenticated: null,

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


            logoutSuccess: null,
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
        })
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(
            userReducer({}, {
                type: GET_USER_REQUEST
            })
        ).toEqual({
            getUserRequest: true,
        })
    })

    it('should handle GET_USER_SUCCESS', () => {
        expect(
            userReducer({}, {
                type: GET_USER_SUCCESS,
                user: {},
            })
        ).toEqual({
            getUserSuccess: true,
            getUserRequest: false,
            getUserError: false,
            user: {},
            isAuthenticated: true,
        })
    })

    it('should handle GET_USER_ERROR', () => {
        expect(
            userReducer({}, {
                type: GET_USER_ERROR,
                getUserMessage: 'Error'
            })
        ).toEqual({
            getUserError: true,
            getUserRequest: false,
            isAuthenticated: false,
        })
    })

    it('should handle DELETE_USER', () => {
        expect(
            userReducer({}, {
                type: DELETE_USER
            })
        ).toEqual({
            user: {
                email: '',
                name: '',
                password: ''
            },
            isAuthenticated: null,

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


            logoutSuccess: null,
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
        })
    })

    it('should handle EDIT_USER_REQUEST', () => {
        expect(
            userReducer({}, {
                type: EDIT_USER_REQUEST
            })
        ).toEqual({
            editUserRequest: true,
        })
    })

    it('should handle EDIT_USER_SUCCESS', () => {
        expect(
            userReducer({}, {
                type: EDIT_USER_SUCCESS,
                user: {}
            })
        ).toEqual({
            editUserSuccess: true,
            editUserRequest: false,
            editUserError: false,
            user: {},
        })
    })

    it('should handle EDIT_USER_ERROR', () => {
        expect(
            userReducer({}, {
                type: EDIT_USER_ERROR,
            })
        ).toEqual({
            editUserError: true,
            editUserRequest: false,
        })
    })

    it('should handle REFRESH_TOKEN_REQUEST', () => {
        expect(
            userReducer({}, {
                type: REFRESH_TOKEN_REQUEST,
            })
        ).toEqual({
            refreshTokenRequest: true,
            refreshTokenError: false,
            getUserError: false,
        })
    })

    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(
            userReducer({}, {
                type: REFRESH_TOKEN_SUCCESS,
            })
        ).toEqual({
            refreshTokenRequest: false,
            isAuthenticated: true
        })
    })

    it('should handle REFRESH_TOKEN_ERROR', () => {
        expect(
            userReducer({}, {
                type: REFRESH_TOKEN_ERROR,
            })
        ).toEqual({
            refreshTokenRequest: false,
            refreshTokenError: true,
            isAuthenticated: false,
        })
    })

    it('should handle GET_FORGOT_PASSWORD_REQUEST', () => {
        expect(
            userReducer({}, {
                type: GET_FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual({
            forgotPasswordRequest: true,
        })
    })

    it('should handle GET_FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            userReducer({}, {
                type: GET_FORGOT_PASSWORD_SUCCESS,
                message: 'forgot password'
            })
        ).toEqual({
            forgotPasswordRequest: false,
            forgotPasswordSuccess: true,
            forgotPasswordMessage: 'forgot password',
        })
    })

    it('should handle GET_FORGOT_PASSWORD_ERROR', () => {
        expect(
            userReducer({}, {
                type: GET_FORGOT_PASSWORD_ERROR,
            })
        ).toEqual({
            forgotPasswordRequest: false,
            forgotPasswordError: true,
        })
    })

    it('should handle GET_RESET_PASSWORD_REQUEST', () => {
        expect(
            userReducer({}, {
                type: GET_RESET_PASSWORD_REQUEST,
            })
        ).toEqual({
            resetPasswordRequest: true,
        })
    })

    it('should handle GET_RESET_PASSWORD_SUCCESS', () => {
        expect(
            userReducer({}, {
                type: GET_RESET_PASSWORD_SUCCESS,
                message: 'reset password',
            })
        ).toEqual({
            resetPasswordRequest: false,
            resetPasswordSuccess: true,
            resetPasswordMessage: 'reset password',
        })
    })

    it('should handle GET_RESET_PASSWORD_ERROR', () => {
        expect(
            userReducer({}, {
                type: GET_RESET_PASSWORD_ERROR,
            })
        ).toEqual({
            resetPasswordRequest: false,
            resetPasswordError: true,
        })
    })

    it('should handle GET_AUTHORIZATION_REQUEST', () => {
        expect(
            userReducer({}, {
                type: GET_AUTHORIZATION_REQUEST,
            })
        ).toEqual({
            loginRequest: true,
        })
    })

    it('should handle GET_AUTHORIZATION_SUCCESS', () => {
        expect(
            userReducer({}, {
                type: GET_AUTHORIZATION_SUCCESS,
                user: {},
            })
        ).toEqual({
            user: {},
            isAuthenticated: true,
            loginSuccess: true,
            loginRequest: false,
            loginError: false,
        })
    })

    it('should handle GET_AUTHORIZATION_ERROR', () => {
        expect(
            userReducer({}, {
                type: GET_AUTHORIZATION_ERROR,
            })
        ).toEqual({
            loginRequest: false,
            loginError: true,
        })
    })

    it('should handle GET_LOGOUT_REQUEST', () => {
        expect(
            userReducer({}, {
                type: GET_LOGOUT_REQUEST,
            })
        ).toEqual({
            logoutRequest: true,
            isAuthenticated: false,
        })
    })

    it('should handle GET_LOGOUT_SUCCESS', () => {
        expect(
            userReducer({}, {
                type: GET_LOGOUT_SUCCESS,
            })
        ).toEqual({
            logoutSuccess: true,
            logoutRequest: false,
            logoutError: false,
            isAuthenticated: false,
        })
    })

    it('should handle GET_LOGOUT_ERROR', () => {
        expect(
            userReducer({}, {
                type: GET_LOGOUT_ERROR,
            })
        ).toEqual({
            logoutRequest: false,
            logoutError: true,
        })
    })

    it('should handle GET_CREATE_USER_REQUEST', () => {
        expect(
            userReducer({}, {
                type: GET_CREATE_USER_REQUEST,
            })
        ).toEqual({
            createUserRequest: true,
        })
    })

    it('should handle GET_CREATE_USER_SUCCESS', () => {
        expect(
            userReducer({}, {
                type: GET_CREATE_USER_SUCCESS,
                user: {},
            })
        ).toEqual({
            user: {},
            isAuthenticated: true,
            createUserRequest: false,
            createUserSuccess: true,
        })
    })

    it('should handle GET_CREATE_USER_ERROR', () => {
        expect(
            userReducer({}, {
                type: GET_CREATE_USER_ERROR,
                message: 'create user error',
            })
        ).toEqual({
            createUserRequest: false,
            createUserError: true,
            createUserMessage: 'create user error',
        })
    })
})