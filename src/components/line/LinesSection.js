import React from 'react'
import { useSelector } from 'react-redux'
import { cardTypes } from '../../lists/cardTypes'
// import { StatusFilters } from '../home/StatusFilters'
import { Card } from '../ui/Card'
import { NewLineBlock } from './NewLineBlock'

export const LinesSection = () => {

    const {lines} = useSelector( state => state.lines );

    lines.sort( (a, b) => {
        return a.timeRemaining - b.timeRemaining;
      });

    return (
        <>
            <div className="home__filters">
                <h2>My Lines</h2>
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
