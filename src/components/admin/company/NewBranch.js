import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startAddingBranch } from '../../../redux/actions/companies';
import loaderGif from "../../../assets/loader.gif";
import { OpeningHours } from '../ui/OpeningHours';

export const NewBranch = () => {

    const { admin } = useSelector( state => state.companies );
    
    const { loading } = useSelector( state => state.ui );

    const initState = {
        id: `${new Date().getTime()}`,
        company: '',
        name:'',
        address:'',
        latitude:'',
        longitude:'',
        openHours:[
            {
                day:1,
                open: true,
                name: 'monday',
                startHour:'00:00',
                endHour:'00:00',
            },
            {
                day:2,
                open: true,
                name: 'tuesday',
                startHour:'00:00',
                endHour:'00:00',
            },
            {
                day:3,
                open: true,
                name: 'wednesday',
                startHour:'00:00',
                endHour:'00:00',
            },
            {
                day:4,
                open: true,
                name: 'thursday',
                startHour:'00:00',
                endHour:'00:00',
            },
            {
                day:5,
                open: true,
                name: 'friday',
                startHour:'00:00',
                endHour:'00:00',
            },
            {
                day:6,
                open: true,
                name: 'saturday',
                startHour:'00:00',
                endHour:'00:00',
            },
            {
                day:0,
                open: false,
                name: 'sunday',
                startHour:'00:00',
                endHour:'00:00',
            }
        ],
    };

    const [formValues, setFormValues] = useState(initState)

    const [branchCreated, setBranchCreated] = useState(false);

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

    if(admin.companies.length === 0){
        Swal.fire('Oops', 'It appears there are no companies created. You need to have a company created before adding a branch', 'error');
        return <Redirect to="/new-company" />;
    }

    const { company, name, address} = formValues;

    const handleInputChange = ({target}) => {
        setFormValues({
			...formValues,
			[target.name]: target.value,
		})
    }

    const handleInputChangeOpeningHours = (dayIndex,e) => {
        setFormValues({
            ...formValues,
            openHours: formValues.openHours.map( (day,index) => 
                {
                    if(dayIndex !== index ){
                        return day;
                    } else {
                        let updatedDay = {
                            ...formValues.openHours[index],
                            [e.target.name] : (e.target.type === 'checkbox') ? e.target.checked : e.target.value
                        };
                        return updatedDay
                    }
                }
            )
        })        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        await dispatch( startAddingBranch(formValues) );
        setBranchCreated(true);
    }

    if(branchCreated){
        return <Redirect to="/new-service" />;
    }

    return (
        <div className="admin__main">
            <h1 className="admin__title"> New Branch </h1>
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
                <label htmlFor="address">Address</label>
                <input
                    id="address"
                    type="text"
                    className="admin__input form-control"
                    name="address"
                    onChange={handleInputChange}
                    value={address}
                    required
                />
                <fieldset>
                    <legend>Opening Hours</legend>
                        <div className="admin__days-inputs-group">
                        {
                            formValues.openHours.map((day, index) => (
                                <OpeningHours 
                                    key={index}
                                    day={day.name}
                                    dayOpen = {day.open}
                                    openName="open"
                                    startHour={day.startHour}
                                    startName="startHour"
                                    endHour= {day.endHour}
                                    endName="endHour"
                                    handler={(e)=>handleInputChangeOpeningHours(index, e)}
                                />
                            ))
                        }
                        </div>
                       
                </fieldset> 
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
