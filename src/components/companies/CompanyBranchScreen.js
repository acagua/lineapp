import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom'
import { startLoadingBranchServices, startLoadingCompanyBranches } from '../../redux/actions/companies';
import { Card } from '../ui/Card';
import loaderGif from "../../assets/loader.gif";
import Swal from 'sweetalert2';
import { isOpen } from '../../utils/time';

export const CompanyBranchScreen = () => {

    const { companyId, branchId } = useParams();
    
    const {user} = useSelector( state => state.companies );
    const dispatch = useDispatch();

    const [branchesLoaded, setBranchesLoaded] = useState(false);
    const [servicesLoaded, setServicesLoaded] = useState(false);

    const company = user.companies.find(company => company.id === companyId);

    const branch = user.branches.find(branch => branch.id === branchId);
    
    const services = user.services;

    useEffect(() => {
        const fetchServices =  async () => {
                if(user.branches.length === 0){
                    await dispatch( startLoadingCompanyBranches( companyId) );  
                }
                await dispatch( startLoadingBranchServices( branchId) );  
                setBranchesLoaded(true);
                setServicesLoaded(true);
            }
        fetchServices();
    }, [companyId, branchId, user.branches, dispatch]);

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

    const {name, address, openHours}= branch;

    if(services.length === 0){
        Swal.fire('Sorry!', 'That branch doesn\'t have services created. Please try on other branches.' ,'error');
        return <Redirect to={`/company/${company.id}/branch/${branch.id}`} />
    }
    
    const nowDate = new Date(); 

    const {startHour, endHour, open} = openHours.find( day => (nowDate.getDay() === day.day));


    return (
        <div>
            <h2> {companyName}-{name}</h2>
            <p> {address}</p>
            <ul>
                {
                    openHours.map((day, index) => (
                        <li
                            key={index}
                            className={(day.day === nowDate.getDay())?(open && isOpen(nowDate, startHour, endHour))?'ui__text-wait':'ui__text-now':''}
                        >
                            {day.name.charAt(0).toUpperCase() + day.name.substring(1,3)} : {(day.open)? `${day.startHour} - ${day.endHour}` : 'Closed'}
                        </li>
                    ))
                }
            </ul>
            <h3>Services: </h3>
            <div className="ui__cards-section">
                {
                    services.map( (service, index) => (
                        <Card 
                            key={index}
                            title={service.name}
                            {...service}
                            link={`/company/${companyId}/branch/${branchId}/service/${service.id}`}
                        />
                        ))
                }
            </div>
        </div>
    )
}
