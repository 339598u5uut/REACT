import { Middleware, MiddlewareAPI } from "redux";
import { TWSOrderActions } from "../actions/ws";
import { AppDispatch, RootState } from "../reducers/root-reducer";


export const socketMiddleware = (wsActions: TWSOrderActions): Middleware => {
	return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return next => (action) => {
			const { dispatch, getState } = store;
			const { type, payload, wsUrl } = action;
			const { wsInit, onOpen, onClose, onError, onMessage, onSendMessage } = wsActions;

			if (type === wsInit) {
				socket = new WebSocket(wsUrl);
			}

			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = event => {
					const data = JSON.parse(event.data);
					dispatch({ type: onMessage, payload: data });
				};

				socket.onclose = event => {
					dispatch({ type: onClose, payload: event });
				};

				if (type === onSendMessage) {
					const message = payload;
					socket.send(JSON.stringify(message));
				}
			}
			next(action);
		};
	}) as Middleware;
};
