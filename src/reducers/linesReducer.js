import { types } from "../types/types";

const initialState = {
    lines: [{
        title:'Bancolombia',
        branch:'122',
        eta: 30
    }],
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
        default:
            return state
    }
}