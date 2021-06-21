import { types } from "../types/types";
import { db } from '../../firebase/firebaseConfig'
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';
import { loadLines, loadLinesInfoBranches, loadLinesInfoCompanies } from "../../helpers/loadLines";


export const startAddingToQueue = (uid, companyId, companyName, branchId, branchName, serviceId, name, queueTime) => {
    return async (dispatch) => {
        dispatch( startLoading());
        const queueFirebase = await db.collection(`companies/${companyId}/branches/${branchId}/services`).doc(serviceId).get();
        
        const queue = queueFirebase.data()?.queue||[];
        console.log('queue',queue);
        
        db.collection(`companies/${companyId}/branches/${branchId}/services`).doc(serviceId).update({
            queue: [...queue, uid],
        });
        Swal.fire('Success','Your are know in line, keep checking your line status for any updates', 'success')
        dispatch (addedToQueue (uid, companyId, companyName, branchId, branchName, serviceId, name, queueTime));
        dispatch( finishLoading());
    }
    
}

export const addedToQueue = (uid, companyId, companyName, branchId, branchName, serviceId, serviceName, queueTime) => ({

    
    type: types.lineAddNewLine,
    payload: {
        id: serviceId,
        uid,
        companyId,
        companyName,
        branchId,
        branchName,
        serviceId,
        serviceName,
        timeRemaining:queueTime
    }
});



export const startLoadingLines = (uid) => {
    return async (dispatch) => {
        dispatch( startLoading());
        const services = await loadLines(uid);
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

            services.map( service => {
                
                let queueTime = Math.ceil(parseFloat(service.minutesPerUser)*parseFloat(service.queue.indexOf(uid))/parseFloat(service.attendingResources));
                return (
                    lines.push(
                        {
                            id:service.id,
                            companyId: service.company,
                            companyName: companies.find( company => company.id === service.company).name,
                            branchId:service.branch,
                            branchName: branches.find( branch => branch.id === service.branch).name,
                            serviceId: service.id,
                            serviceName: service.name,
                            timeRemaining: queueTime,
                        } 
                    )
                )
            });
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


export const startLeavingQueue = (companyId, branchId, serviceId) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { lines } = getState().lines;
        
        const serviceFirebase = await db.doc(`companies/${companyId}/branches/${branchId}/services/${serviceId}`).get();
        
        const queue = serviceFirebase.data().queue||[];
        db.doc(`companies/${companyId}/branches/${branchId}/services/${serviceId}`).update({
            queue: queue.filter((user, index) => (queue[index] !== uid))
        });

        dispatch(leaveQueue(lines,serviceId))
    }
}

export const leaveQueue = (lines, id) => ({
    type: types.lineLeaveLine,
    payload: {lines, id} 
});

export const linesLogout = () => ({
    type: types.lineLogoutCleaning,
});
