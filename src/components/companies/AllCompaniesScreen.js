import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../ui/Card';

export const AllCompaniesScreen = () => {

    const {user} = useSelector ( state => state.companies);
    return (
        <>  
            <header>
                <h2> Select a company </h2>
            </header>
            <div className="ui__cards-section" ariarole="companies list">
                {
                    user.companies.map( (company, index) => (
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
