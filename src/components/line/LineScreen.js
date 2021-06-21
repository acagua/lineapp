import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { startLoadingBranchServices, startLoadingCompanyBranches } from '../../redux/actions/companies';
import loaderGif from "../../assets/loader.gif";
import Swal from 'sweetalert2';
import { startLeavingQueue } from '../../redux/actions/lines';

export const LineScreen = () => {
    const initState = {companyId: null, branchId:null, serviceId:null};

    const { lineId }= useParams();
    const { lines } = useSelector( state => state.lines );
    const { user } = useSelector( state => state.companies );
    const { uid } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const line = lines.find((line) => (line.id ===  lineId));

    const { companyId, branchId, serviceId } = (line)? line:initState;

    const [branchesLoaded, setBranchesLoaded] = useState(false);
    const [servicesLoaded, setServicesLoaded] = useState(false);

    const company = user.companies.find(company => company.id === companyId);
    const branch = user.branches.find(branch => branch.id === branchId);
    const service = user.services.find(service => service.id === serviceId);
    
    useEffect(() => {
        console.log(lines)
        const fetchServices =  async () => {
            if(lines.length > 0){
                if(user.branches.length === 0 && companyId){
                    await dispatch( startLoadingCompanyBranches( companyId) );  
                }
                if(user.services.length === 0 && branchId){
                    await dispatch( startLoadingBranchServices( branchId) );  
                }
                setBranchesLoaded(true);
                setServicesLoaded(true);
            }
        }
        fetchServices();
    }, [lines, companyId, branchId, user.branches, user.services, dispatch]);

    if(!branchesLoaded || !servicesLoaded){
        return (
            <>
                <div className="ui__loader">
                    <img
                        src={ loaderGif }
                        alt="loader"
                    />
                </div>
            </>
        )
    
    }

    if(!service){
        return <Redirect to ="/" />
    }

    if(!branch || !company ){
        Swal.fire('Oops', 'Something went wrong loading your line, please try again.')
        return <Redirect to ="/" />
    }

    const {name:companyName } = company;
    const {name:branchName, address } = branch;
    const {name, attendingResources, queue, minutesPerUser}= service;
    
    const queueTime = Math.ceil((parseFloat(minutesPerUser)*parseFloat(queue.indexOf(uid))/parseFloat(attendingResources)));

    const handleOutOfLine = () => {
        dispatch( startLeavingQueue(companyId, branchId, serviceId) );
    }
    // const handleInLineConfirmation = () => {
    //     return <Redirect to="/"/>
    // }
    return (
        <div>
            <h2>{companyName}</h2>
            <p>{branchName} - {address}</p>
            <p>{name}</p>
            <p> Time Remaining: {queueTime} minutes</p>
            <div className="line__update-status">

                {/* <button 
                    className="btn btn-primary-outline btn-15"
                    onClick={handleInLineConfirmation}
                    
                    >
                    <i className="fas fa-clock"></i>
                    <span> Still waiting </span>
                </button> */}
                <button 
                    className="btn btn-secondary-outline btn-15"
                    onClick={handleOutOfLine}
                    
                    >
                    <i className="fas fa-store-slash"></i>
                    <span> Enough, I'm out </span>
                </button>
            </div>
        </div>
    )
}
