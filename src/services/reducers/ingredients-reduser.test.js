import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR, } from "../actions";
import { getAllIngredientsReducer, initialState } from "./ingredients-reduser";

describe('getAllIngredientsReducer', () => {
    it('should return the initial state', () => {
        expect(getAllIngredientsReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            getAllIngredientsReducer((initialState), {
                type: GET_INGREDIENTS_REQUEST
            })
        ).toEqual({
            ...initialState,
            ingredientsRequest: true,
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            getAllIngredientsReducer((initialState), {
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: [1, 2, 3, 4],
            })
        ).toEqual({
            ...initialState,
            ingredients: [1, 2, 3, 4],
        })
    })

    it('should handle GET_INGREDIENTS_ERROR', () => {
        expect(
            getAllIngredientsReducer((initialState), {
                type: GET_INGREDIENTS_ERROR
            })
        ).toEqual({
            ...initialState,
            ingredientsError: true,
        })
    })
})