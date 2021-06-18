import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const LineScreen = () => {


    const { lineId }= useParams();
    const { lines } = useSelector( state => state.lines );
    //Debe recibir los params con el id de la fila
    
    const { company, branch, service } = lines.find((line) => (line.id ===  lineId));


    const handleOutOfLine = (e) => {
        e.preventDefault();

    }
    const handleInLineConfirmation = (e) => {
        e.preventDefault();

    }
    return (
        <div>
            <p>{company}</p>
            <p>{branch}</p>
            <p>{service}</p>
            <buton 
                className="btn btn-primary-outline"
                onClick={handleInLineConfirmation}

            >
                <i className="fas fa-clock"></i>
                <span> I'm still in line </span>
            </buton>
            <buton 
                className="btn btn-secondary-outline"
                onClick={handleOutOfLine}

            >
                <i className="fas fa-store-slash"></i>
                <span> Get out of line </span>
            </buton>
        </div>
    )
}
