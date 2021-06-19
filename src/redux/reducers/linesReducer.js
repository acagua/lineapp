import { types } from "../types/types";

const initialState = {
    lines: [
        {
            id:'l1',
            companyId:'Bancolombia',
            branchId:'CL 122',
            serviceId:'Cashier',
            timeRemaining: 40
        },
        {
            id:'l1',
            companyId:'Avianca',
            branchId:'Unicentro',
            serviceId:'Change Flight',
            timeRemaining: 10
        },
        {
            id:'l1',
            companyId:'Davivienda',
            branchId:'Unicentro',
            serviceId:'Advisory',
            timeRemaining: 50
        },
        {
            id:'l1',
            companyId:'Andres Carne de Res',
            branchId:'Usaquen',
            serviceId:'Food',
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
        case types.lineLoadLines:
            return {
                ...state,
                lines:action.payload
            }
        default:
            return state
    }
}