import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const LineScreen = () => {


    const { lineId }= useParams();
    const { lines } = useSelector( state => state.lines );
    //Debe recibir los params con el id de la fila
    
    const { companyId, branchId, serviceId } = lines.find((line) => (line.id ===  lineId));


    const handleOutOfLine = () => {

    }
    const handleInLineConfirmation = () => {

    }
    return (
        <div>
            <h2>{companyId}</h2>
            <p>{branchId}</p>
            <p>{serviceId}</p>
            <div className="line__update-status">

                <button 
                    className="btn btn-primary-outline btn-15"
                    onClick={handleInLineConfirmation}
                    
                    >
                    <i className="fas fa-clock"></i>
                    <span> Still waiting </span>
                </button>
                <button 
                    className="btn btn-secondary-outline btn-15"
                    onClick={handleOutOfLine}
                    
                    >
                    <i className="fas fa-store-slash"></i>
                    <span> Enough, I'm out </span>
                </button>
            </div>
        </div>
    )
}
