import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm'
import { startRegister } from '../../redux/actions/auth';
import { userRoles } from '../../lists/userRoles';

const errorInitState = {
    error: false,
    errMessage: "",
  }
  const initialForm = {
      name: '',
      email: '',
      phone: '',
      password: '',
      password2: '',
      role: userRoles.user,
    }
    
    export const RegisterScreen = () => {
        
        
    const dispatch = useDispatch();
    
    const { loading } = useSelector( state => state.ui );
    
    const [formError, setFormError] = useState(errorInitState);

    const { error, errMessage } = formError;

    const [ formValues, handleInputChange ] = useForm(initialForm);

    const {name, email, phone, role, password, password2} = formValues;
   
    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()){
            
            dispatch(startRegister(email, password, name, phone, role));
        }
    }

    const isFormValid = () => {
        
        if(name.trim().length === 0){
            setFormError(
            {
                error:true,
                errMessage:'Please enter your name'
            });
            return false;
        } else if ( !(/^\d+$/.test(phone)) ){
            setFormError(
            {
                error:true,
                errMessage:'Phone must only have digits'
            });
            return false;
        } else if (phone.length < 10 ){
            setFormError(
            {
                error:true,
                errMessage:'Phone must have 10 digits'
            });
            return false;
        }else if (!validator.isEmail(email)){
            setFormError(
            {
                error:true,
                errMessage:'Email is not valid'
            });
            return false;
        } else if ( password.length < 5){
            setFormError(
            {
                error:true,
                errMessage:'Password must be at least 6 characters long'
            });
            return false;
        } else if ( password !== password2){
            setFormError(
            {
                error:true,
                errMessage:'Passwords are not the same'
            });
            return false;
        }
        
        setFormError(errorInitState);
        
        return true;
    }

    return (
        <div className="auth__main" ariarole="background">
            <div className="auth__form-container" ariarole="container">
                <h1 className="auth__title mb-5"> New account </h1>
                <form className="mb-3" onSubmit={ handleRegister }>
                    {
                        (error) && 
                        (
                            <div id="error" className="auth__alert-error mb-2">
                                { errMessage }
                            </div>
                        )
                    }
                    <input 
                        type="text"
                        placeholder="Name"
                        name="name"
                        className={`auth__input form-control`}
                        autoComplete="off"
                        value = { name }
                        onChange = { handleInputChange }
                        aria-label="name"
                        aria-required="true"
                        required
                    />
                    <input 
                        type="tel"
                        placeholder="Phone"
                        name="phone"
                        className={`auth__input form-control`}
                        autoComplete="off"
                        value = { phone }
                        onChange = { handleInputChange }
                        aria-label="phone"
                        aria-required="true"
                        required
                    />
                    <input 
                        type="text"
                        placeholder="Email"
                        name="email"
                        className={`auth__input form-control`}
                        autoComplete="off"
                        value = { email }
                        onChange = { handleInputChange }
                        aria-label="email"
                        aria-required="true"
                        required
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="off"
                        // className={`auth__input form-control ${ !validPassword && 'is-invalid' }`}
                        className={`auth__input form-control`}
                        value = { password }
                        onChange = { handleInputChange }
                        aria-label="password"
                        aria-required="true"
                        required
                    />
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        autoComplete="off"
                        // className={`auth__input form-control ${ !validPassword && 'is-invalid' }`}
                        className={`auth__input form-control`}
                        value = { password2 }
                        onChange = { handleInputChange }
                        aria-label="password confirmation"
                        aria-required="true"
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mt-3"
                        disabled = { loading || !( email.length > 0 &&  password.length > 0) } 
                    >
                        Sign Up
                    </button>
                    
                </form>
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already have an account?
                </Link>
            </div>
        </div>
    )
}
