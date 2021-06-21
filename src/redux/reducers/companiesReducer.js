import { types } from "../types/types";

const initState={
    user:{
        companies:[],
        branches:[],
        services:[],
    },
    admin: {
        companies:[],
        branches:[],
        services:[],
    }
}


export const companyReducer = (state =initState, action) => {
    switch (action.type) {
        case types.companyLoadCompanies:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    companies: action.payload,
                },
                user:{
                    ...state.user,
                    companies: action.payload,
                }
            }
        case types.companyAddCompany:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    companies:[...state.admin.companies, action.payload]
                }
            }
        case types.companyLoadBranches:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    branches: action.payload,
                }
            }
        case types.companyLoadCompanyBranches:
            return {
                ...state,
                user:{
                    ...state.user,
                    branches: action.payload,
                }
            }
        case types.companyAddBranch:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    branches:[...state.admin.branches, action.payload]
                }
            }
        case types.companyLoadServices:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    services: action.payload,
                }
            }
        case types.companyLoadBranchServices:
            return {
                ...state,
                user:{
                    ...state.user,
                    services: action.payload,
                }
            }
        case types.companyAddService:
            return {
                ...state,
                admin:{
                    ...state.admin,
                    services:[...state.admin.services, action.payload]
                }
            }
        default:
            return state;
    }
}

