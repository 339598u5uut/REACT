import { GET_INGREDIENT, DEL_INGREDIENT, OPEN_INGREDIENT_MODAL, CLOSE_INGREDIENT_MODAL, } from "../actions";
import { currentIngredientReducer } from "./ingredient-detales-reduser";

describe('currentIngredientReducer', () => {
    it('should return the initial state', () => {
        expect(currentIngredientReducer(undefined, {})).toEqual({
            ingredient: {},
            modalOpen: false,
        })
    })

    it('should handle GET_INGREDIENT', () => {
        expect(
            currentIngredientReducer({}, {
                type: GET_INGREDIENT
            })
        ).toEqual({
            ingredient: {}
        })

    })

    it('should handle DEL_INGREDIENT', () => {
        expect(
            currentIngredientReducer({}, {
                type: DEL_INGREDIENT
            })
        ).toEqual({
            ingredient: {}
        })

    })

    it('should handle OPEN_INGREDIENT_MODAL', () => {
        expect(
            currentIngredientReducer({}, {
                type: OPEN_INGREDIENT_MODAL
            })
        ).toEqual({
            modalOpen: true,
        })

    })

    it('should handle CLOSE_INGREDIENT_MODAL', () => {
        expect(
            currentIngredientReducer({}, {
                type: CLOSE_INGREDIENT_MODAL
            })
        ).toEqual({
            modalOpen: false,
        })

    })

})