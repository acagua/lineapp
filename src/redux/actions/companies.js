import { types } from "../types/types";
import { db } from '../../firebase/firebaseConfig'
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';


export const startAddingCompany = (company) => {
    return async (dispatch) => {
        dispatch( startLoading());
        
        await db.doc(`companies/${ company.id }`).set( company );
        dispatch (companyAdded (company));
        Swal.fire('Success', 'Company saved! Let\'s create a branch now', 'success');

        dispatch( finishLoading());
    } 
}

export const companyAdded = (company) => ({
    type: types.companyAddCompany,
    payload: company
});

export const startLoadingCompanies = ( ) => {
    return async (dispatch) => {
        // dispatch( startLoading());
        
        const companiesSnap = await db.collection(`companies`).get();

        const companies = [];

        companiesSnap.forEach ( snapHijo => {
            companies.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        });
        dispatch(loadedCompanies(companies));
        // dispatch( finishLoading());
    }
}

export const loadedCompanies = (companies) => ({
    type: types.companyLoadCompanies,
    payload: companies
});

export const startAddingBranch = (branch) => {
    
    return async (dispatch) => {
        dispatch( startLoading());
        
        await db.doc(`companies/${ branch.company }/branches/${branch.id}`).set( branch );
        dispatch (branchAdded (branch));
        Swal.fire('Success', 'Branch saved! Let\'s create a service now', 'success');
        dispatch( finishLoading());
    } 
}

export const branchAdded = (branch) => ({
    type: types.companyAddBranch,
    payload: branch
});

export const startLoadingBranches = ( ) => {
    return async (dispatch) => {
        // dispatch( startLoading());
        
        const branchesSnap = await db.collectionGroup(`branches`).get();

        const branches = [];

        branchesSnap.forEach ( snapHijo => {
            branches.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        });
        dispatch(loadedBranches(branches));
        // dispatch( finishLoading());
    }
}

export const loadedBranches = (branches) => ({
    type: types.companyLoadBranches,
    payload: branches
});

export const startLoadingCompanyBranches = ( companyId ) => {
    return async (dispatch) => {
        // dispatch( startLoading());
        
        const branchesSnap = await db.collectionGroup(`branches`).where('company', '==', companyId).get();

        const branches = [];

        branchesSnap.forEach ( snapHijo => {
            branches.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        });
        dispatch(loadedCompanyBranches(branches));
        // dispatch( finishLoading());
    }
}

export const loadedCompanyBranches = (branches) => ({
    type: types.companyLoadCompanyBranches,
    payload: branches
});

export const startAddingService = (service) => {
    
    return async (dispatch) => {
        dispatch( startLoading());
        
        await db.doc(`companies/${ service.company }/branches/${service.branch}/services/${service.id}`).set( service );
        console.log(service);
        dispatch (serviceAdded (service));
        Swal.fire('Success', 'Service saved!', 'success');
        dispatch( finishLoading());
    } 
}

export const serviceAdded = (service) => ({
    type: types.companyAddService,
    payload: service
});

export const startLoadingServices = ( ) => {
    return async (dispatch) => {
        dispatch( startLoading());
        
        const servicesSnap = await db.collectionGroup(`services`).get();

        const services = [];

        servicesSnap.forEach ( snapHijo => {
            services.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        });
        dispatch(loadedServices(services));
        dispatch( finishLoading());
    }
}

export const loadedServices = (services) => ({
    type: types.companyLoadServices,
    payload: services
});

export const startLoadingBranchServices = ( branchId ) => {
    return async (dispatch) => {
        dispatch( startLoading());
        
        const servicesSnap = await db.collectionGroup(`services`).where('branch', '==', branchId).get();

        const services = [];

        servicesSnap.forEach ( snapHijo => {
            services.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        });
        dispatch(loadedBranchServices(services));
        dispatch( finishLoading());
    }
}

export const loadedBranchServices = (services) => ({
    type: types.companyLoadBranchServices,
    payload: services
});