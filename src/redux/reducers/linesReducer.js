import { types } from "../types/types";

const initialState = {
    lines: []
}

export const linesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.lineAddNewLine:
            return {
                ...state,
                lines:[
                    ...state.lines,
                    action.payload
                ]
            }
        case types.lineLoadLines:
            return {
                ...state,
                lines:action.payload
            }
        default:
            return state
    }
}