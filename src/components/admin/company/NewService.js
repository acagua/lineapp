import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startAddingService } from '../../../redux/actions/companies';
import loaderGif from "../../../assets/loader.gif";

export const NewService = () => {

    const { admin } = useSelector( state => state.companies );
    
    const { loading } = useSelector( state => state.ui );

    const initState = {
        id: `${new Date().getTime()}`,
        company:'',
        branch:'',
        name:'',
        minutesPerUser:1,
        attendingResources:1,
        queue:[],
    };

    const [formValues, setFormValues] = useState(initState)

    const { company, branch, name, minutesPerUser, attendingResources} = formValues;
    
    const [serviceCreated, setServiceCreated] = useState(false);

    const dispatch = useDispatch();

    if(loading){
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
    
    if(!formValues.company) {
        setFormValues({
            ...formValues,
            company:admin.companies[0]?.id
        })
    } 

    if(!formValues.branch) {
        setFormValues({
            ...formValues,
            branch:(admin.branches.filter(branch => branch.company === admin.companies[0]?.id)[0]?.id)
        })
    } 

    if(admin.companies.length === 0){
        Swal.fire('Oops', 'It appears there are no companies created. You need to have a company created before adding a branch', 'error');
        return <Redirect to="/new-company" />;
    }

    if(admin.branches.length === 0){
        Swal.fire('Oops', 'It appears there are no branches created. You need to have a branch created before adding a service', 'error');
        return <Redirect to="/new-branch" />;
    }

    const handleInputChange = ({target}) => {
        setFormValues({
			...formValues,
			[target.name]: target.value,
		})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        await dispatch( startAddingService(formValues) );
        setServiceCreated(true);
    }

    if(serviceCreated){
        return <Redirect to="/" />;
    }

    return (
        <div className="admin__main">
            <h1 className="admin__title"> New Service </h1>
            <form className="admin__form" onSubmit={handleSubmit}>
                <label>
                    Company
                    <select 
                        className="admin__input"
                        name="company"
                        onChange={handleInputChange}
                        value={company}
                    >
                        {
                            admin.companies.map( (company, index) => (
                                <option value={company.id} key={index}>{company.name}</option>
                            ))
                        }
                    </select>
                </label>
                <label>
                    Branch
                    <select 
                        className="admin__input"
                        name="branch"
                        onChange={handleInputChange}
                        value={branch}
                    >
                        {
                            admin.branches.filter( branch => branch.company === company).map( (branch, index)=> (
                                <option value={branch.id} key={index}>{branch.name}</option>
                            ))
                        }
                    </select>
                </label>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    className="admin__input form-control"
                    name="name"
                    onChange={handleInputChange}
                    value={name}
                    required
                />
                <label htmlFor="minutes-per-user">Minutes per user</label>
                <input
                    id="minutes-per-user"
                    type="number"
                    min="1"
                    className="admin__input form-control"
                    name="minutesPerUser"
                    onChange={handleInputChange}
                    value={minutesPerUser}
                    required
                />
                <label htmlFor="attending-resources">Attending Resources</label>
                <input
                    id="attending-resources"
                    type="number"
                    min="1"
                    className="admin__input form-control"
                    name="attendingResources"
                    onChange={handleInputChange}
                    value={attendingResources}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mt-2"
                    >
                    Save
                </button>
            </form>
        </div>
    )
}
