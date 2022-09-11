import { GET_INGREDIENT, DEL_INGREDIENT, OPEN_INGREDIENT_MODAL, CLOSE_INGREDIENT_MODAL, } from "../actions";
import { currentIngredientReducer, initialState } from "./ingredient-detales-reduser";

describe('currentIngredientReducer', () => {
    it('should return the initial state', () => {
        expect(currentIngredientReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_INGREDIENT', () => {
        expect(
            currentIngredientReducer((initialState), {
                type: GET_INGREDIENT
            })
        ).toEqual({
            ...initialState,
            ingredient: {}
        })
    })

    it('should handle DEL_INGREDIENT', () => {
        expect(
            currentIngredientReducer((initialState), {
                type: DEL_INGREDIENT
            })
        ).toEqual({
            ...initialState,
            ingredient: {}
        })
    })

    it('should handle OPEN_INGREDIENT_MODAL', () => {
        expect(
            currentIngredientReducer((initialState), {
                type: OPEN_INGREDIENT_MODAL
            })
        ).toEqual({
            ...initialState,
            modalOpen: true,
        })
    })

    it('should handle CLOSE_INGREDIENT_MODAL', () => {
        expect(
            currentIngredientReducer((initialState), {
                type: CLOSE_INGREDIENT_MODAL
            })
        ).toEqual({...initialState })
    })
})