import {
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_ORDERS,
	WS_SEND_ORDERS,
} from ".";
import { TGetOrdersResponse } from "../../utils/types";

export type TWSConnectionStart = {
	readonly type: typeof WS_CONNECTION_START,
	readonly wsUrl: string;
}

export type TWSConnectionSuccess = {
	readonly type: typeof WS_CONNECTION_SUCCESS,
}

export type TWSConnectionError = {
	readonly type: typeof WS_CONNECTION_ERROR,
	readonly payload: Event;
}

export type TWSConnectionClosed = {
	readonly type: typeof WS_CONNECTION_CLOSED,
}

export type TWSGetOrders = {
	readonly type: typeof WS_GET_ORDERS,
	readonly payload: TGetOrdersResponse;

}

export type TWSSendOrders = {
	readonly type: typeof WS_SEND_ORDERS,
	readonly payload: any
}


//Union
export type TWSActions = TWSConnectionStart | TWSConnectionSuccess | TWSConnectionError
	| TWSGetOrders | TWSConnectionClosed | TWSSendOrders;

export type TWSOrderActions = {
	wsInit: typeof WS_CONNECTION_START,
	onOpen: typeof WS_CONNECTION_SUCCESS,
	onClose: typeof WS_CONNECTION_CLOSED,
	onError: typeof WS_CONNECTION_ERROR,
	onMessage: typeof WS_GET_ORDERS,
	onSendMessage: typeof WS_SEND_ORDERS,
}

export const wsConnectionStart = (wsUrl: string): TWSConnectionStart => {
	return {
		type: WS_CONNECTION_START,
		wsUrl,
	};
};

export const wsConnectionSuccess = (): TWSConnectionSuccess => {
	return {
		type: WS_CONNECTION_SUCCESS,
	};
};

export const wsConnectionError = (error: Event): TWSConnectionError => {
	return {
		type: WS_CONNECTION_ERROR,
		payload: error
	};
};

export const wsConnectionClosed = (): TWSConnectionClosed => {
	return {
		type: WS_CONNECTION_CLOSED
	};
};

export const wsGetOrders = (response: TGetOrdersResponse): TWSGetOrders => {
	return {
		type: WS_GET_ORDERS,
		payload: response,

	};
};

export const wsSendOrders = (orders: []): TWSSendOrders => {
	return {
		type: WS_SEND_ORDERS,
		payload: orders
	};
};



