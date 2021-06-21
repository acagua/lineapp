import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { firebase } from '../firebase/firebaseConfig'
import { login, startLoadingUser} from '../redux/actions/auth'
import loaderGif from "../assets/loader.gif";
import { startLoadingBranches, startLoadingCompanies, startLoadingServices } from '../redux/actions/companies'
import { finishLoading, startLoading } from '../redux/actions/ui'
import { startLoadingLines } from '../redux/actions/lines'

// import { startLoadingAllIdeas, startLoadingIdeas } from '../actions/idea'

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( (user) => { //observable
            
            if(user?.uid){
                dispatch( login( user.uid ) ); // TODO: Traer dinámico el rol
                setIsLoggedIn(true);
                dispatch ( startLoadingUser (user.uid ) );
                dispatch( startLoading());
                dispatch ( startLoadingCompanies () );
                dispatch ( startLoadingBranches () );
                dispatch( finishLoading());
                dispatch ( startLoadingServices () );
                dispatch (startLoadingLines(user.uid));
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
                        component={ DashboardRoutes }
                        isAuthenticated={ isLoggedIn } 
                    />
                    
                </Switch>
            </div>
        </Router>  
    )
}
