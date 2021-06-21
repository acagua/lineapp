import React from 'react'
import { useSelector } from 'react-redux'
import { cardTypes } from '../../lists/cardTypes'
// import { StatusFilters } from '../home/StatusFilters'
import { Card } from '../ui/Card'
import { NewLineBlock } from './NewLineBlock'
import { useDispatch } from 'react-redux';
import { startLoadingLines } from '../../redux/actions/lines';

export const LinesSection = () => {

    const {lines} = useSelector( state => state.lines );
    const {uid} = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const handleUpdate = ()=>{
        dispatch(startLoadingLines(uid));
    }
    lines.sort( (a, b) => {
        return a.timeRemaining - b.timeRemaining;
      });

    return (
        <>
            <div className="home__filters">
                <h2>My Lines</h2>
                <button className="btn" onClick={handleUpdate}> 
                    <i className="fas fa-sync-alt fa-2x"/>
                </button>
                {/* <StatusFilters /> */}
            </div>
            <div className="ui__cards-section">
                <NewLineBlock />
                {
                    lines.map( (line, index) => (
                        <Card
                        key={index}
                        title={line.companyName}
                        type={cardTypes.line}
                        {...line}
                        link={`/line/${line.id}`}
                        />
                    ))
                }
            </div>
        </>
    )
}
