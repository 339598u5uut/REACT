export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const SHOW_MODAL = 'SHOW_MODAL';
export const NOT_SHOW_MODAL = 'SHOW_MODAL';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR'

export const ARRAY_DRAG_MOVE = "ARRAY_DRAG_MOVE";

export const GET_INGREDIENT = "GET_INGREDIENT";
export const DEL_INGREDIENT = 'DEL_INGREDIENT';

export default function checkResponse(res) {
    if (!res.ok) {
        throw new Error("Сервер не отвечает.");
    }
    return res.json();
}