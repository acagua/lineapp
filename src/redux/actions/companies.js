import { types } from "../types/types";
import { db } from '../../firebase/firebaseConfig'
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';


export const startAddingCompany = (company) => {
    return async (dispatch) => {
        dispatch( startLoading());
        
        await db.doc(`companiesTest/${ company.id }`).set( company );
        dispatch (companyAdded (company));
        Swal.fire('Success', 'Company saved! Let\'s create a branch now', 'success');

        dispatch( finishLoading());
    } 
}

export const companyAdded = (company) => ({
    type: types.companyAddCompany,
    payload: company
});

export const startAddingBranch = (branch) => {
    
    return async (dispatch) => {
        dispatch( startLoading());
        
        await db.doc(`companiesTest/${ branch.company }/branches/${branch.id}`).set( branch );
        console.log(branch);
        dispatch (branchAdded (branch));
        Swal.fire('Success', 'Branch saved! Let\'s create a service now', 'success');
        dispatch( finishLoading());
    } 
}

export const branchAdded = (branch) => ({
    type: types.companyAddBranch,
    payload: branch
});


export const startLoadingCompanies = ( ) => {
    return async (dispatch) => {
        dispatch( startLoading());
        
        const companiesSnap = await db.collection(`companiesTest`).get();

        const companies = [];

        companiesSnap.forEach ( snapHijo => {
            companies.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        });
        dispatch(loadedCompanies(companies));
        dispatch( finishLoading());
    }
}

export const loadedCompanies = (companies) => ({
    type: types.companyLoadCompanies,
    payload: companies
});


export const startLoadingBranches = ( ) => {
    return async (dispatch) => {
        dispatch( startLoading());
        
        const branchesSnap = await db.collectionGroup(`branches`).get();

        const branches = [];

        branchesSnap.forEach ( snapHijo => {
            branches.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        });
        dispatch(loadedBranches(branches));
        dispatch( finishLoading());
    }
}

export const loadedBranches = (branches) => ({
    type: types.companyLoadBranches,
    payload: branches
});