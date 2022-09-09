import { getNumberOrderReducer, initialState } from "./order-reduser";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL } from "../actions";

describe('getNumberOrderReducer', () => {
    it('should return the initial state', () => {
        expect(getNumberOrderReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            getNumberOrderReducer((initialState), {
                type: GET_ORDER_REQUEST
            })
        ).toEqual({
            ...initialState,
            isFetching: true,
            orderRequest: true,
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            getNumberOrderReducer((initialState), {
                type: GET_ORDER_SUCCESS,
                order: 4,
            })
        ).toEqual({
            ...initialState,
            order: 4,
        })
    })

    it('should handle GET_INGREDIENTS_ERROR', () => {
        expect(
            getNumberOrderReducer((initialState), {
                type: GET_ORDER_ERROR
            })
        ).toEqual({
            ...initialState,
            orderError: true,
        })
    })

    it('should handle OPEN_ORDER_MODAL', () => {
        expect(
            getNumberOrderReducer((initialState), {
                type: OPEN_ORDER_MODAL
            })
        ).toEqual({
            ...initialState,
            orderOpen: true,
        })
    })

    it('should handle CLOSE_ORDER_MODAL', () => {
        expect(
            getNumberOrderReducer((initialState), {
                type: CLOSE_ORDER_MODAL
            })
        ).toEqual({...initialState })
    })
})