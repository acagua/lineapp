import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../ui/Card'
import { NewLineBlock } from './NewLineBlock'

export const LinesSection = () => {

    const {lines} = useSelector( state => state.lines );

    return (
        <div className="ui__cards-section">
            <NewLineBlock />
            {
                lines.map( (line, index) => (
                    <Card
                    key={index}
                    {...line}
                    />
                ))
            }
        </div>
    )
}
