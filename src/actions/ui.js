import { types } from '../types/types';

//return si es asincrono, sin return o return de objeto "({})" si no lo es
export const setError = (err)=> ({
    type: types.uiSetError,
    payload: err  
});  

export const removeError = ()=> ({
    type: types.uiRemoveError
});  

export const startLoading = ()=> ({
    type: types.uiStartLoading
});  

export const finishLoading = ()=> ({
    type: types.uiFinishLoading
});  

export const openModal = ()=> ({
    type: types.uiOpenModal
});  

export const closeModal = ()=> ({
    type: types.uiCloseModal
});  