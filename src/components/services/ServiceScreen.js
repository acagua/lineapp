import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const ServiceScreen = () => {

    const { companyId, branchId, serviceId } = useParams();
    
    const companies = useSelector( state => state.companies );

    const { branches } = companies.find((company) => (company.id === companyId));

    const { services } = branches.find((branch) => (branch.id === branchId));

    console.log(services);
    const { name, attendingResources, usersInLine, minutesPerUser/*, nextInLineTime */} = services.find((service) => (service.id === serviceId));

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
                    Estimated time: {parseFloat(minutesPerUser)*parseFloat(usersInLine.length)/parseFloat(attendingResources)}
                </p>
            </header>
            <div className="category__content">
                <button className="btn btn-primary">
                    Get in line!
                </button>
            </div>
        </>
    )
}
