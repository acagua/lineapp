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
        case types.lineLeaveLine:
            return {
                ...state,
                lines: action.payload.lines.filter(line => (line.id !== action.payload.id))
            }
        case types.lineLogoutCleaning:
            return initialState;
        default:
            return state
    }
}