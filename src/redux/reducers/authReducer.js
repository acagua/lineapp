import { types } from "../types/types";

// const initState = {
//         uid: '7z9wjiuu4oXLPwrplvoIRp8K5qT2',
//         name: 'Andres Test',
//         role: '3',
// } // TODO QUITAR EL INITSTATE

export const authReducer = (state = {uid:'', data:{}}/*initState*/, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                uid: action.payload.uid,
            }
        case types.authLoadUser:
            return {
                ...state,
                uid: action.payload.uid,
                data: action.payload.user
            }
        case types.logout:
            return { };
        default:
            return state;
    }
}