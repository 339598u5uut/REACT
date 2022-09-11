import { ingredientReducer, initialState } from "./ingredient-reduser";
import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN, ARRAY_DRAG_MOVE, CLEAR_CONSTRUCTOR } from "../actions";

describe('currentIngredientReducer', () => {
    it('should return the initial state', () => {
        expect(ingredientReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle GET_INGREDIENT', () => {
        const action = {
            type: ADD_INGREDIENT,
            array: [1, 2, 2]
        }
        expect(ingredientReducer(initialState, action)).toEqual({
            ...initialState,
            ingredientItems: [action.array],
        })
    })

    it('should handle DELETE_INGREDIENT', () => {
        const action = {
            type: DELETE_INGREDIENT,
            ingredientItems: [1]
        }
        expect(ingredientReducer(initialState, action)).toEqual({
            ...initialState,
            ingredientItems: [],
        })
    })

    it('should handle ADD_BUN', () => {
        const action = {
            type: ADD_BUN,
            array: { _id: '123' }
        }
        expect(ingredientReducer(initialState, action)).toEqual({
            ...initialState,
            ingredientBun: { _id: '123' },
        })
    })

    it('should handle ARRAY_DRAG_MOVE', () => {
        const action = {
            type: ARRAY_DRAG_MOVE,
            array: [23456]
        }
        expect(ingredientReducer(initialState, action)).toEqual({
            ...initialState,
            ingredientItems: [23456],
        })
    })

    it('should handle CLEAR_CONSTRUCTOR', () => {
        const action = {
            type: CLEAR_CONSTRUCTOR,
        }
        expect(ingredientReducer(initialState, action)).toEqual({...initialState })
    })
})