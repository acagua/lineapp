import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';
import { db } from '../firebase/firebaseConfig';
import { loadUser } from "../helpers/loadUser";

//return si es asincrono, sin return si no lo es
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        
        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                
                dispatch( login(user.uid) );
                dispatch( finishLoading());
            }).catch( ({ message }) => {
                dispatch( finishLoading()); // podría ser en el finally pero complica el manejo de error con swal
                Swal.fire('Error', message, 'error' );
            })
    }
}

export const startRegister = (email, password, name, phone) => {
    return (dispatch) => {
        dispatch( startLoading() );
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({ user }) => {

                await user.updateProfile({
                    displayName: name
                });
                db.collection("users").doc(user.uid)
                .set({
                    name,
                    phone,
                })

                dispatch (login (user.uid));
                dispatch( finishLoading());

            })
            .catch ( e => {
                dispatch( startLoading() );
                Swal.fire('Error', e.message, 'error' );
            });
    }
}

export const startLoginGoogle = (email, password) => { // si es asínctrona se hace el return (dispatch)
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch (login (user.uid));
            } );
    }
}

export const login = (uid) => ({
    type: types.login,
    payload: {
        uid
    }
});

export const startLoadingUser = ( uid ) =>{
    return async ( dispatch ) => {
        const user = await loadUser ( uid );
        dispatch( setLoadedUser ( user ) );
    }
}
export const setLoadedUser = ( user ) => ({
    type: types.authLoadUser,
    payload: user
})


export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch ( logout() );

        // dispatch ( noteLogout() );
    }
}
export const logout = () => ({
    type: types.logout,
});