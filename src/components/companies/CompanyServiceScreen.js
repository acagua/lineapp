import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startAddingToQueue } from '../../redux/actions/lines';
import loaderGif from "../../assets/loader.gif";
import { startLoadingBranchServices, startLoadingCompanyBranches } from '../../redux/actions/companies';
import { isOpen } from '../../utils/time';

export const CompanyServiceScreen = () => {

    const { companyId, branchId, serviceId } = useParams();
    
    const {user} = useSelector( state => state.companies );
    const { uid } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const [branchesLoaded, setBranchesLoaded] = useState(false);
    const [servicesLoaded, setServicesLoaded] = useState(false);

    const company = user.companies.find(company => company.id === companyId);
    const branch = user.branches.find(branch => branch.id === branchId);
    const service = user.services.find(service => service.id === serviceId);


    useEffect(() => {
        const fetchServices =  async () => {
                if(user.branches.length === 0){
                    await dispatch( startLoadingCompanyBranches( companyId) );  
                }
                if(user.services.length === 0){
                    await dispatch( startLoadingBranchServices( branchId) );  
                }
                setBranchesLoaded(true);
                setServicesLoaded(true);
            }
        fetchServices();
    }, [companyId, branchId, user.branches, user.services, dispatch]);

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

    if(!company){
        Swal.fire('Sorry!', 'Oops, we didn\'t find information on that company. Please try again.' ,'error');
        return <Redirect to="/companies" />
    }

    const {name:companyName} = company;

    if(!branch){
        Swal.fire('Sorry!', 'Oops, we didn\'t find information on that branch. Please try again.' ,'error');
        return <Redirect to={`/company/${company.id}`} />
    }

    const {name:branchName, address, openHours}= branch;

    const nowDate = new Date(); 

    const {startHour, endHour, open} = openHours.find( day => (nowDate.getDay() === day.day));

    
    if(!service){
        Swal.fire('Sorry!', 'Oops, we didn\'t find information on that service. Please try again.' ,'error');
        return <Redirect to={`/company/${company.id}/${branch.id}`} />
    }

    const {name, attendingResources, queue, minutesPerUser}= service;
    const queueTime = parseFloat(minutesPerUser)*parseFloat(queue.length)/parseFloat(attendingResources);

    const handleSubmitAdd = () =>{
        dispatch ( startAddingToQueue(uid, companyId, companyName, branchId, branchName, serviceId, name, queueTime ));
    }

    return (
        <>
            <header>
                <h2>
                    Service: {name}
                </h2>
                <p>
                    Company: {companyName}
                </p>
                <p>
                    Branch: {branchName} - {address}
                </p>
                <p>
                    People Attending: {attendingResources}
                </p>
                <p>
                    Current users in line: {queue.length}
                </p>
                <p>
                    minutes per user {minutesPerUser}
                </p>
                <p>
                    Queue time: {queueTime}
                </p>
                <p className={(isOpen(nowDate, startHour, endHour,open))? 'ui__text-wait' : 'ui__text-now' }>
                    Status: {(isOpen(nowDate, startHour, endHour,open))?'Open' : 'Closed'}
                </p>
            </header>
            <div className="category__content">
                <button className="btn btn-primary btn-15" onClick={handleSubmitAdd} disabled={!isOpen(nowDate, startHour, endHour,open)}>
                    Get in line!
                </button>
            </div>
        </>
    )
}
