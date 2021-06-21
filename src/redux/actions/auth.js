import { types } from "../types/types";
import { db, firebase } from '../../firebase/firebaseConfig'
import { finishLoading, startLoading } from "./ui";
import { loadUser } from "../../helpers/loadUser";
import Swal from 'sweetalert2';
import { companiesLogout } from "./companies";
import { linesLogout } from "./lines";

//return si es asincrono, sin return si no lo es
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        
        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async({ user }) => {
                
                await dispatch(startLoadingUser(user.uid));
                // dispatch( login(user.uid) );
                dispatch( finishLoading());
            }).catch( ({ message }) => {
                dispatch( finishLoading()); // podría ser en el finally pero complica el manejo de error con swal
                Swal.fire('Error', message, 'error' );
            })
    }
}

export const startRegister = (email, password, name, phone, role) => {
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
                    role, 
                })

                await dispatch (startLoadingUser(user.uid));
                // dispatch (login (user.uid));
                dispatch( finishLoading());

            })
            .catch ( e => {
                dispatch( startLoading() );
                Swal.fire('Error', e.message, 'error' );
            });
    }
}

// export const startLoginGoogle = (email, password) => { // si es asínctrona se hace el return (dispatch)
//     return (dispatch) => {
//         firebase.auth().signInWithPopup( googleAuthProvider )
//             .then( ({ user }) => {
//                 dispatch (login (user.uid));
//             } );
//     }
// }

// export const login = (uid) => ({
//     type: types.login,
//     payload: {
//         uid
//     }
// });

export const startLoadingUser = ( uid ) =>{
    return async ( dispatch ) => {
        const user = await loadUser ( uid );
        dispatch( setLoadedUser (uid, user) );
    }
}
export const setLoadedUser = ( uid, user ) => ({
    type: types.authLoadUser,
    payload: {uid, user}
})


export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch ( logout() );
        dispatch( companiesLogout());
        dispatch( linesLogout());

    }
}
export const logout = () => ({
    type: types.logout,
});