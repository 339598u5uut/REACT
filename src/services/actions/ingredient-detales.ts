import {
    GET_INGREDIENT,
    DEL_INGREDIENT,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
} from ".";
import { TIngredient } from "../../utils/types";

export type TgetIngredient = {
    readonly type: typeof GET_INGREDIENT;
    readonly array: TIngredient;
}

export type TdeleteIngredient = {
    readonly type: typeof DEL_INGREDIENT;
}

export type TopenIngredientModal = {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
}

export type TcloseIngredientModal = {
    readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

//Union
export type TIngredientDetalesActions =
    TgetIngredient | TdeleteIngredient | TopenIngredientModal | TcloseIngredientModal;


export const getIngredient = (ingredient: TIngredient): TgetIngredient => {
    return {
        type: GET_INGREDIENT,
        array: ingredient
    }
}
export const deleteIngredient = (): TdeleteIngredient => {
    return {
        type: DEL_INGREDIENT
    }
}

export const openIngredientModal = (): TopenIngredientModal => {
    return {
        type: OPEN_INGREDIENT_MODAL
    }
}

export const closeIngredientModal = (): TcloseIngredientModal => {
    return {
        type: CLOSE_INGREDIENT_MODAL
    }
}