import { getNumberOrderReducer } from "./order-reduser";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL } from "../actions";

describe('getNumberOrderReducer', () => {
    it('should return the initial state', () => {
        expect(getNumberOrderReducer(undefined, {})).toEqual({
            order: 0,
            orderRequest: false,
            orderError: false,
            isFetching: false,
            orderOpen: false,
        })
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            getNumberOrderReducer({}, {
                type: GET_ORDER_REQUEST
            })
        ).toEqual({
            isFetching: true,
            order: 0,
            orderError: false,
            orderOpen: false,
            orderRequest: true,
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            getNumberOrderReducer({}, {
                type: GET_ORDER_SUCCESS,
                order: 4,
            })
        ).toEqual({
            order: 4,
            orderRequest: false,
            orderError: false,
            isFetching: false,
        })
    })

    it('should handle GET_INGREDIENTS_ERROR', () => {
        expect(
            getNumberOrderReducer({}, {
                type: GET_ORDER_ERROR
            })
        ).toEqual({
            orderError: true,
            orderRequest: false,
            isFetching: false,
        })
    })

    it('should handle OPEN_ORDER_MODAL', () => {
        expect(
            getNumberOrderReducer({}, {
                type: OPEN_ORDER_MODAL
            })
        ).toEqual({
            orderOpen: true,
        })
    })

    it('should handle CLOSE_ORDER_MODAL', () => {
        expect(
            getNumberOrderReducer({}, {
                type: CLOSE_ORDER_MODAL
            })
        ).toEqual({
            orderOpen: false,
        })
    })


})