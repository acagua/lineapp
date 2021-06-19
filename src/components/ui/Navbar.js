import React from 'react';
import { useDispatch/*, useSelector*/ } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../redux/actions/auth';
//import { AuthContext } from '../../auth/AuthContext';
import logo from '../../assets/logo-w.png';

export const Navbar = ( ) => {
    
    const dispatch = useDispatch();
    
    // const { name } = useSelector( state => state.auth );

    const handleLogout = () => {        
        dispatch( startLogout() );
    }

    return (
        <nav>
            <div className="ui__header">
                <Link className="ui__logo" to="/">
                <img 
                    src={ logo }
                    className="ui__logo-w100"
                    alt="logo"
                />
                </Link>
                <div className="ui__icons">
                    {/* <Link 
                        to="/my-account"
                        className="link-inverted" 
                        >
                        <i className="fas fa-user fa-2x"></i>
                        {/* <span> My Account </span> * /}
                    </Link> */}
                    <Link 
                        to="/new-company"
                        className="link-inverted" 
                    >
                        <i className="fas fa-building fa-2x"></i>
                        {/* <span> New Company </span> */}
                    </Link>
                    <Link 
                        to="/new-branch"
                        className="link-inverted" 
                    >
                        <i className="fas fa-store fa-2x"></i>
                        {/* <span> New Branch </span> */}
                    </Link>
                    <Link 
                        to="/new-service"
                        className="link-inverted" 
                    >
                        <i className="fas fa-concierge-bell fa-2x"></i>
                        {/* <span> My Service </span> */}
                    </Link>
                    <button 
                        className="btn link-inverted btn-icon-text" 
                        onClick={ handleLogout }
                        >
                        <i className="fas fa-sign-out-alt fa-2x"/>
                        {/* <span>  Logout</span> */}
                    </button>
                </div>
            </div>
        </nav>
    )
}