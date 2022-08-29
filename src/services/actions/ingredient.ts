import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN, ARRAY_DRAG_MOVE, CLEAR_CONSTRUCTOR } from ".";
import { TIngredient } from "../../utils/types";
import { TIngredientInState } from "../../utils/types";
const { v4: uuidv4 } = require('uuid');


export type TaddIngredient = {
    readonly type: typeof ADD_INGREDIENT;
    readonly array: TIngredientInState;
}

export type TaddIngredientBun = {
    readonly type: typeof ADD_BUN;
    readonly array: { _id: string };
}

export type TdeleteIngredient = {
    readonly type: typeof DELETE_INGREDIENT;
    readonly id: string;
}

export type TarrayDragMove = {
    readonly type: typeof ARRAY_DRAG_MOVE;
    readonly array: Array<TIngredient>;
}

export type TclearConstructor = {
    readonly type: typeof CLEAR_CONSTRUCTOR;

}

//Union
export type TIngredientActions =
    TaddIngredient | TaddIngredientBun | TdeleteIngredient | TarrayDragMove | TclearConstructor;


export const addIngredient = (ingredient: TIngredientInState) => {
    return {
        type: ADD_INGREDIENT,
        array: { ...ingredient, constructorId: uuidv4() },
    };
}

export const addIngredientBun = (ingredient: { _id: string }): TaddIngredientBun => {
    return {
        type: ADD_BUN,
        array: ingredient
    };
}

export const deleteIngredient = (id: string): TdeleteIngredient => {
    return {
        type: DELETE_INGREDIENT,
        id
    };
}

export function clearConstructor(): TclearConstructor {
    return {
        type: CLEAR_CONSTRUCTOR
    }
}

export const arrayDragMove = (array: Array<TIngredient>): TarrayDragMove => {
    return {
        type: ARRAY_DRAG_MOVE,
        array
    };
}