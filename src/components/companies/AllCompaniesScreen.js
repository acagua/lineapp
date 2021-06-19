import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../ui/Card';

export const AllCompaniesScreen = () => {

    const {companies} = useSelector ( state => state.companies);
    return (
        <>
            <h2> Select a company </h2>
            <div className="ui__cards-section">
                {
                    companies.map( (company, index) => (
                        <Card
                            key={index}
                            title={company.name}
                            link={`company/${company.id}`}
                        />
                    ))
                }
            </div>
        </>
    )
}
