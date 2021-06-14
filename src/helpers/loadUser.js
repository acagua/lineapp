import { db } from '../firebase/firebaseConfig';


export const loadUser = async( uid ) =>{
    
    const userSnap = await db.collection(`users`).doc(uid).get();
    return userSnap.data();
    
}
