import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { DashboardRouter } from './DashboardRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { firebase } from '../firebase/firebaseConfig'
import { login } from '../actions/auth'
import loaderGif from "../assets/loader.gif";

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( (user) => { //observable
            
            if(user?.uid){
                dispatch( login( user.uid, user.displayName, 2 ) ); // TODO: Traer dinámico el rol
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);

        })

    }, [dispatch, setChecking]); //realmente no debe cambiar el dispatch, es por el warning

    if(checking){
        return (
            <>
                <div className="ui__loader">
                    <img
                        src={ loaderGif }
                        alt="loader"
                    />
                    {/* <h1>Cargando</h1> */}
                </div>
            </>
        )
    }    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth" 
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }  
                    />
                    <PrivateRoute
                        path="/" 
                        component={ DashboardRouter }
                        isAuthenticated={ isLoggedIn } 
                    />
                    
                </Switch>
            </div>
        </Router>  
    )
}
