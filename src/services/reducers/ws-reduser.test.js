import { wsReducer } from "./ws-reduser";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ORDERS } from "../actions";

describe('wsReducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual({
            wsConnected: false,
            orders: [],
            total: 0,
            totalToday: 0,
        })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_CLOSED
            })
        ).toEqual({
            error: undefined,
            wsConnected: false
        })
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_ERROR,
                payload: 'error'
            })
        ).toEqual({
            error: 'error',
            wsConnected: false
        })
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_SUCCESS,
            })
        ).toEqual({
            error: undefined,
            wsConnected: true
        })
    })

    it('should handle WS_GET_ORDERS', () => {
        expect(
            wsReducer({}, {
                type: WS_GET_ORDERS,
                payload: {
                    orders: [1, 2, 3],
                    total: 555,
                    totalToday: 55555,
                }
            })
        ).toEqual({
            error: undefined,
            orders: [1, 2, 3],
            total: 555,
            totalToday: 55555,
        })
    })

})