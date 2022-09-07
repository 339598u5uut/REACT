import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR, } from "../actions";
import { getAllIngredientsReducer } from "./ingredients-reduser";

describe('getAllIngredientsReducer', () => {
    it('should return the initial state', () => {
        expect(getAllIngredientsReducer(undefined, {})).toEqual({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsError: false,
        })
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            getAllIngredientsReducer({}, {
                type: GET_INGREDIENTS_REQUEST
            })
        ).toEqual({
            ingredientsRequest: true,
        })

    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            getAllIngredientsReducer({}, {
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: [1, 2, 3, 4],
            })
        ).toEqual({
            ingredients: [1, 2, 3, 4],
            ingredientsRequest: false,
            ingredientsError: false,
        })

    })

    it('should handle GET_INGREDIENTS_ERROR', () => {
        expect(
            getAllIngredientsReducer({}, {
                type: GET_INGREDIENTS_ERROR
            })
        ).toEqual({
            ingredientsError: true,
            ingredientsRequest: false,
        })

    })

})