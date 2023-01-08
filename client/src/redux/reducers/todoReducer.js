import { TODO } from "../types/types"

export const todoReducer = (state = {}, action) => {
    switch (action.type) {
        case TODO:
            return action.payload;
        default:
            return state
    }
}