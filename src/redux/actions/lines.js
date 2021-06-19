import { types } from "../types/types";
import { db } from '../../firebase/firebaseConfig'
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';
import { loadLines, loadLinesInfoBranches, loadLinesInfoCompanies } from "../../helpers/loadLines";


export const startAddingToQueue = (uid, companyId, branchId, serviceId, queueTime) => {
    return async (dispatch) => {
        dispatch( startLoading());
        const queueFirebase = await db.collection(`companies/${companyId}/branches/${branchId}/services`).doc(serviceId).get();
        
        const queue = queueFirebase.data()?.queue||[];
        console.log(queue);
        
        db.collection(`companies/${companyId}/branches/${branchId}/services`).doc(serviceId).update({
            queue: [...queue, uid],
        });
        Swal.fire('Success','Your are know in line, keep checking your line status for any updates', 'success')
        dispatch (addedToQueue (uid, companyId, branchId, serviceId,queueTime));
        dispatch( finishLoading());
    }
    
}

export const addedToQueue = (uid, companyId, branchId, serviceId, queueTime) => ({
    type: types.lineAddNewLine,
    payload: {
        id:`${new Date().getTime()}`,
        uid,
        companyId,
        branchId,
        serviceId,
        timeRemaining:queueTime

    }
});



export const startLoadingLines = (uid) => {
    return async (dispatch) => {
        dispatch( startLoading());
        const services = await loadLines(uid);
        console.log(services);
        let lines = [];
        if(services.length > 0){

            let servicesCompanies = [];
            let servicesBranches = [];
            
            services.map((service)=>{
                servicesCompanies.push(service.company);
                servicesBranches.push(service.branch);
                return true;
            })

            const companies = await loadLinesInfoCompanies (servicesCompanies);
            const branches = await loadLinesInfoBranches (servicesBranches);

            services.map( service => (
                lines.push(
                    {
                        id:service.id,
                        companyId: service.company,
                        companyName: companies.find( company => company.id === service.company).name,
                        branchId:service.branch,
                        branchName: branches.find( branch => branch.id === service.branch).name,
                        serviceId: service.id,
                        serviceName: service.name,
                        timeRemaining: 90 //TODO actualizar según fila en ese momento
                    }
                )
            ));
        }
        dispatch( loadedLines(lines));
        dispatch( finishLoading());

        return services;
    }
}
export const loadedLines = (lines) => ({
    type: types.lineLoadLines,
    payload: lines
});
