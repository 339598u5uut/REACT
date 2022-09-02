import { TWSActions } from "../actions/ws";
import { TOrder } from "../../utils/types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_ORDERS } from "../actions";

type TWSState = {
	wsConnected: boolean;
	orders: Array<TOrder>;
	total: number;
	totalToday: number;
	error?: Event;
}

const initialState: TWSState = {
	wsConnected: false,
	orders: [],
	total: 0,
	totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
	switch (action.type) {
		case WS_CONNECTION_SUCCESS:
			return {
				...state,
				error: undefined,
				wsConnected: true
			};
		case WS_CONNECTION_ERROR:
			return {
				...state,
				error: action.payload,
				wsConnected: false
			};
		case WS_CONNECTION_CLOSED:
			return {
				...state,
				error: undefined,
				wsConnected: false
			};
		case WS_GET_ORDERS:
			return {
				...state,
				error: undefined,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday,
			};
		default:
			return state;
	}
}; 