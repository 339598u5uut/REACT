import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR } from ".";
import { URL } from "../../utils/app-api";
import checkResponse from ".";
import { TIngredient } from "../../utils/types";
import { AppDispatch,AppThunk } from "../reducers/root-reducer";


export type TgetIngredientsReq = {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export type TgetIngredientsSucc = {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredient>
}

export type TgetIngredientsError = {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}

//Union
export type TIngredientsActions =
    TgetIngredientsReq | TgetIngredientsSucc | TgetIngredientsError;


export const getIngredientsRequest = () => {
    return fetch(`${URL}/ingredients`)
        .then(checkResponse)
        .then(data => {
            return data;
        })
        .catch(e => {
            return Promise.reject(e)
        })
};

export function getIngredientsReq(): TgetIngredientsReq {
    return {
        type: GET_INGREDIENTS_REQUEST
    }
}

export function getIngredientsSucc(res: { data: Array<TIngredient> }): TgetIngredientsSucc {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data
    }
}

export function getIngredientsError(): TgetIngredientsError {
    return {
        type: GET_INGREDIENTS_ERROR
    }
}

// middleware
export const ingredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsReq());
    getIngredientsRequest()
        .then(res => {
            if (res && res.success) {
                dispatch(getIngredientsSucc(res));
            } else {
                dispatch(getIngredientsError());
            }
        }).catch(err => {
            dispatch(getIngredientsError());
        })
}