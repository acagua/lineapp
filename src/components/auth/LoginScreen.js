import React, { useState } from 'react'
import { useDispatch} from 'react-redux';

import validator from "validator";
// import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { startLoginEmailPassword } from '../../redux/actions/auth';

const errorInitState = {
  error: false,
  errMessage: "",
}

export const LoginScreen = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    
    const [loginError, setLoginError] = useState(errorInitState);

    const { email, password } = formValues;
    const { error, errMessage } = loginError;

    const handleInputChange = ( { target } ) =>{
		setFormValues({
			...formValues,
			[target.name]: target.value
		})
	}

    const handleLogin = (e) => {
        e.preventDefault();
        if (formIsValid()) {
            //Swal.fire("Login", "Successful login!", "success");
            dispatch( startLoginEmailPassword(email, password ) );
        }
    };

    const formIsValid = () => {
        if (!validator.isEmail(email)) {
            setLoginError(
            {
                error:true,
                errMessage:'Email is not valid'
            });
            return false;
        } else if (password.length < 5) {
            setLoginError(
            {
                error:true,
                errMessage:'Password must be at least 6 characters long'
            });
            return false;
        }
        setLoginError(errorInitState);

        return true;
    };
    return (
        <div className="auth__main">
            <div className="auth__form-container">
                <h1 className="auth__title mb-5"> Login </h1>
                <form className="mb-3" onSubmit={ handleLogin }>
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
                        id="email"
                        placeholder="Email"
                        name="email"
                        className={`auth__input form-control`}
                        autoComplete="off"
                        value = { email }
                        onChange = { handleInputChange }
                    />
                    <input 
                        type="password"
                        id="password"
                        placeholder="Password"
                        name="password"
                        // className={`auth__input form-control ${ !validPassword && 'is-invalid' }`}
                        className={`auth__input form-control`}
                        value = { password }
                        onChange = { handleInputChange }
                    />
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mt-3"
                        disabled = { !( email.length > 0 &&  password.length > 0) }
                    >
                        Login
                    </button>
                    
                </form>
                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </div>
        </div>
    )
}
