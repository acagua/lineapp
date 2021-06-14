import { useState } from "react"

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState)


    const reset = () =>{
        setValues(initialState);
    };

    const handleInputChange = ({target}) => {
        setValues ({
            ...values,
            [target.name]:target.value //"name:target.value" sirve pero de esta forma no se podría reutilizar para email  
        });
    };

    return [values, handleInputChange, reset];
}