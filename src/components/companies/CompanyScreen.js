import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Card } from '../ui/Card';

export const CompanyScreen = () => {

    const { companyId } = useParams();

    const companies = useSelector( state => state.companies );

    const company = companies.find((company) => (company.id === companyId));

    const {name, branches}= company;
    // TODO Add Google Maps with flag references https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2
    // branches[i].latitude branches[i].longitude
    return (
        <div>
            <h2>{name}</h2>
            <div className="ui__cards-section">
                {
                    branches.map( (branch, index) => (
                        <Card
                        key={index}
                        {...branch}
                        link={`/company/${companyId}/branch/${branch.id}`}
                        />
                        ))
                }
            </div>
        </div>
    )
}
