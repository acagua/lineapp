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
        company: admin.companies[0]?.id,
        name:'',
        address:'',
        latitude:'',
        longitude:'',
        openHours:[
            // {
            //     day:0,
            //     startHour:'00:00',
            //     endHour:'05:00',
            // },
            // {
            //     day:1,
            //     startHour:'02:00',
            //     endHour:'07:00',
            // }
        ],
    };

    //TODO Optimizar arreglo para estandarizar nombres podría manejarse con el param index de map.  
    // Doc: https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks

    const initOpenHoursState = {
        monId:'monday',
        monOpen:false,
        monOpenName:'monOpen',
        monStartHour:'00:00',
        monStartName:'monStartHour',
        monEndHour:'00:00',
        monEndName:'monEndHour',
        tueId:'tuesday',
        tueOpen:false,
        tueOpenName:'tueOpen',
        tueStartHour:'00:00',
        tueStartName:'tueStartHour',
        tueEndHour:'00:00',
        tueEndName:'tueEndHour',
        wedId:'wednesday',
        wedOpen:false,
        wedOpenName:'wedOpen',
        wedStartHour:'00:00',
        wedStartName:'wedStartHour',
        wedEndHour:'00:00',
        wedEndName:'wedEndHour',
        thuId:'thursday',
        thuOpen:false,
        thuOpenName:'thuOpen',
        thuStartHour:'00:00',
        thuStartName:'thuStartHour',
        thuEndHour:'00:00',
        thuEndName:'thuEndHour',
        friId:'friday',
        friOpen:false,
        friOpenName:'friOpen',
        friStartHour:'00:00',
        friStartName:'friStartHour',
        friEndHour:'00:00',
        friEndName:'friEndHour',
        satId:'saturday',
        satOpen:false,
        satOpenName:'satOpen',
        satStartHour:'00:00',
        satStartName:'satStartHour',
        satEndHour:'00:00',
        satEndName:'satEndHour',
        sunId:'sunday',
        sunOpen:false,
        sunOpenName:'sunOpen',
        sunStartHour:'00:00',
        sunStartName:'sunStartHour',
        sunEndHour:'00:00',
        sunEndName:'sunEndHour',
    }

    const [formValues, setFormValues] = useState(initState)

    const [openHours, setOpenHours] = useState(initOpenHoursState);

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

    const handleInputChangeOpeningHours = ({target}) => {
        setOpenHours({
			...openHours,
			[target.name]: (target.type === 'checkbox') ? target.checked : target.value
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
            <h1 className="admin__title"> New Brach </h1>
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
                        <OpeningHours 
                            day={openHours.monId}
                            dayOpen = {openHours.monOpen}
                            openName={openHours.monOpenName}
                            startHour={openHours.monStartHour}
                            startName={openHours.monStartName}
                            endHour= {openHours.monEndHour}
                            endName={openHours.monStartHour}
                            handler={handleInputChangeOpeningHours}
                        />
                        <OpeningHours 
                            day={openHours.tueId}
                            dayOpen = {openHours.tueOpen}
                            openName={openHours.tueOpenName}
                            startHour={openHours.tueStartHour}
                            startName={openHours.tueStartName}
                            endHour= {openHours.tueEndHour}
                            endName={openHours.tueStartHour}
                            handler={handleInputChangeOpeningHours}
                        />
                        <OpeningHours 
                            day={openHours.wedId}
                            dayOpen = {openHours.wedOpen}
                            openName={openHours.wedOpenName}
                            startHour={openHours.wedStartHour}
                            startName={openHours.wedStartName}
                            endHour= {openHours.wedEndHour}
                            endName={openHours.wedStartHour}
                            handler={handleInputChangeOpeningHours}
                        />
                        <OpeningHours 
                            day={openHours.thuId}
                            dayOpen = {openHours.thuOpen}
                            openName={openHours.thuOpenName}
                            startHour={openHours.thuStartHour}
                            startName={openHours.thuStartName}
                            endHour= {openHours.thuEndHour}
                            endName={openHours.thuStartHour}
                            handler={handleInputChangeOpeningHours}
                        />
                        <OpeningHours 
                            day={openHours.friId}
                            dayOpen = {openHours.friOpen}
                            openName={openHours.friOpenName}
                            startHour={openHours.friStartHour}
                            startName={openHours.friStartName}
                            endHour= {openHours.friEndHour}
                            endName={openHours.friStartHour}
                            handler={handleInputChangeOpeningHours}
                        />
                        <OpeningHours 
                            day={openHours.satId}
                            dayOpen = {openHours.satOpen}
                            openName={openHours.satOpenName}
                            startHour={openHours.satStartHour}
                            startName={openHours.satStartName}
                            endHour= {openHours.satEndHour}
                            endName={openHours.satStartHour}
                            handler={handleInputChangeOpeningHours}
                        />
                        <OpeningHours 
                            day={openHours.sunId}
                            dayOpen = {openHours.sunOpen}
                            openName={openHours.sunOpenName}
                            startHour={openHours.sunStartHour}
                            startName={openHours.sunStartName}
                            endHour= {openHours.sunEndHour}
                            endName={openHours.sunStartHour}
                            handler={handleInputChangeOpeningHours}
                        />
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
