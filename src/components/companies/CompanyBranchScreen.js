import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card } from '../ui/Card';

export const CompanyBranchScreen = () => {

    const { companyId, branchId } = useParams();
    
    const {companies} = useSelector( state => state.companies );

    const { branches } = companies.find((company) => (company.id === companyId));

    const { name, address, /*latitude, longitude,*/ openHours, services } = branches.find((branch) => (branch.id === branchId));

    return (
        <div>
            <h2> Branch: {name}</h2>
            <p> Address: {address}</p>
            <ul>
                {
                    openHours.map((day, index) => (
                        <li
                            key={index}
                        >
                            {day.day} : {(day.startHour)? `${day.startHour} - ${day.endHour}` : 'Closed'}
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
