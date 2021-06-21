import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { startAddingCompany } from '../../../redux/actions/companies';

export const NewCompany = () => {

    const initState = {
        id: `${new Date().getTime()}`,
        name:''
    }
    const [formValues, setFormValues] = useState(initState)

    const dispatch = useDispatch();
    const [companyCreated, setCompanyCreated] = useState(false);

    const { name } = formValues;

    const handleInputChange = ({target}) => {
        setFormValues({
			...formValues,
			[target.name]: target.value,
		})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch( startAddingCompany(formValues) );
        setCompanyCreated(true);
    }

    if(companyCreated){
        return <Redirect to="/new-branch" />;
    }

    return (
        <div className="admin__main" ariarole="container">
            <h1 className="admin__title"> New Company </h1>
            <form className="admin__form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    className="admin__input form-control"
                    name="name"
                    onChange={handleInputChange}
                    value={name}
                    aria-required="true"
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    >
                    Save
                </button>
            </form>
        </div>
    )
}
