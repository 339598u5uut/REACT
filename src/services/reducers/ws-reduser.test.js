import { wsReducer, initialState } from "./ws-reduser";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ORDERS } from "../actions";

describe('wsReducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer((initialState), {
                type: WS_CONNECTION_CLOSED
            })
        ).toEqual({
            ...initialState,
            error: undefined,
        })
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer((initialState), {
                type: WS_CONNECTION_ERROR,
                payload: undefined
            })
        ).toEqual({
            ...initialState,
            error: undefined,
        })
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer((initialState), {
                type: WS_CONNECTION_SUCCESS,
            })
        ).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: true
        })
    })

    it('should handle WS_GET_ORDERS', () => {
        expect(
            wsReducer((initialState), {
                type: WS_GET_ORDERS,
                payload: {
                    orders: [1, 2, 3],
                    total: 555,
                    totalToday: 55555,
                }
            })
        ).toEqual({
            ...initialState,
            error: undefined,
            orders: [1, 2, 3],
            total: 555,
            totalToday: 55555,
        })
    })
})