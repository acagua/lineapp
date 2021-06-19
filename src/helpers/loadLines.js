import { db } from '../firebase/firebaseConfig';


export const loadLines = async( uid ) =>{
    
    //const userSnap = await db.collection(`users`).doc(uid).get();
    var documents = [];
    await db.collectionGroup(`services`).where('queue', 'array-contains-any', [uid]).get().then( snapshot => {
        snapshot.forEach(snapHijo => {
            documents.push({
                id: snapHijo.id,
                company:snapHijo.ref.parent.parent.parent.parent.id,
                branch:snapHijo.ref.parent.parent.id,
                ...snapHijo.data()
            })
        })
        // console.log(snapshot.getRef().getParent());
    });
    return documents;
    
}

export const loadLinesInfoCompanies = async( companyId ) =>{
    
    //const userSnap = await db.collection(`users`).doc(uid).get();
    var documents = [];
    await db.collectionGroup(`companies`).where('id', 'in', companyId).get().then( snapshot => {
        snapshot.forEach(snapHijo => {
            documents.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        })
    });
        // console.log(snapshot.getRef().getParent());
    return documents;
}

export const loadLinesInfoBranches = async( branchId ) =>{
    
    //const userSnap = await db.collection(`users`).doc(uid).get();
    var documents = [];
    await db.collectionGroup(`branches`).where('id', 'in', branchId).get().then( snapshot => {
        snapshot.forEach(snapHijo => {
            documents.push({
                id: snapHijo.id,
                ...snapHijo.data()
            })
        })
    });
        // console.log(snapshot.getRef().getParent());
    return documents;
}

