import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { startAddingToQueue } from '../../redux/actions/lines';

export const CompanyServiceScreen = () => {

    const { companyId, branchId, serviceId } = useParams();
    
    const {companies} = useSelector( state => state.companies );
    const { uid } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const { branches } = companies.find((company) => (company.id === companyId));

    const { services } = branches.find((branch) => (branch.id === branchId));

    const { name, attendingResources, usersInLine, minutesPerUser/*, nextInLineTime */} = services.find((service) => (service.id === serviceId));

    const queueTime = parseFloat(minutesPerUser)*parseFloat(usersInLine.length)/parseFloat(attendingResources);

    const handleSubmitAdd = () =>{
        dispatch ( startAddingToQueue(uid, companyId, branchId, serviceId,queueTime ));
    }

    return (
        <>
            <header>
                <h2>
                    Service: {name}
                </h2>
                <p>
                    People Attending: {attendingResources}
                </p>
                <p>
                    Current users in line: {usersInLine.length}
                </p>
                <p>
                    minutes per user {minutesPerUser}
                </p>
                <p>
                    Queue time: {queueTime}
                </p>
            </header>
            <div className="category__content">
                <button className="btn btn-primary btn-15" onClick={handleSubmitAdd}>
                    Get in line!
                </button>
            </div>
        </>
    )
}
