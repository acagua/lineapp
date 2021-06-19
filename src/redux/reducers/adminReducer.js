import { types } from "../types/types";

const initState = {
    companies:[],
    branches:[],
    services:[],
}
export const adminReducer = (state =initState, action) => {
    switch (action.type) {
        case types.adminAddCompany:
            return {
                ...state,
                companies: action.payload,
            }
        case types.adminAddBranch:
            return {
                ...state,
                branches:[...state.branches, action.payload]
            }
        case types.adminAddService:
            return {
                ...state,
                services:[...state.services, action.payload]
            }
        default:
            return state;
    }
}