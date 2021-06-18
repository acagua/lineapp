import { types } from "../types/types";

const initialState = {
    lines: [
        {
            id:'l1',
            company:'Bancolombia',
            branch:'CL 122',
            service:'Cashier',
            timeRemaining: 40
        },
        {
            id:'l1',
            company:'Avianca',
            branch:'Unicentro',
            service:'Change Flight',
            timeRemaining: 10
        },
        {
            id:'l1',
            company:'Davivienda',
            branch:'Unicentro',
            service:'Advisory',
            timeRemaining: 50
        },
        {
            id:'l1',
            company:'Andres Carne de Res',
            branch:'Usaquen',
            service:'Food',
            timeRemaining: 9
        },
    ],
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