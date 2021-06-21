import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom'
import { startLoadingCompanyBranches } from '../../redux/actions/companies';
import { Card } from '../ui/Card';
import loaderGif from "../../assets/loader.gif";
import Swal from 'sweetalert2';

export const CompanyScreen = () => {

    const { companyId } = useParams();
        
    const {user} = useSelector( state => state.companies );

    const [branchesLoaded, setBranchesLoaded] = useState(false);

    const dispatch = useDispatch();

    const company = user.companies.find(company => company.id === companyId);

    const branches = user.branches;
    
    useEffect(() => {
        const fetchBranches =  async () => {
            await dispatch( startLoadingCompanyBranches( companyId) );  
            setBranchesLoaded(true);
        }
        fetchBranches();
    }, [companyId, dispatch]);

    if(!branchesLoaded){
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

    const {name}= company;

    if(branches.length === 0){
        Swal.fire('Sorry!', 'That company doesn\'t have branches created. Please try again later.' ,'error');
        return <Redirect to="/companies" />
    }

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
                            title={branch.name}
                            {...branch}
                            link={`/company/${companyId}/branch/${branch.id}`}
                        />
                        ))
                }
            </div>
        </div>
    )
}
