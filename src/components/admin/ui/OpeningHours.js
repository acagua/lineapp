import React from 'react'

export const OpeningHours = ( { day, dayOpen, openName, startHour, startName, endHour, endName, handler}) => {
let a = '';

    return (
        <div>
            <input 
                id={`${day}-open`}
                type="checkbox" 
                name={openName}
                onChange={handler} 
                checked={dayOpen}
            />
            <label htmlFor={`${day}-open`}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
            <input 
                id={`${day}-start`}
                type="time" 
                className="admin__input-small" 
                // min="00:00" 
                // max="23:59" 
                name={startName} 
                onChange={handler} 
                value={startHour} 
                disabled={!dayOpen} 
                required
                //TODO ARIA A11Y
            />
            <span> to</span>
            <input 
                id={`${day}-end`}
                type="time"
                className="admin__input-small"
                // min="12:00"
                // max="23:59"
                name={endName}
                onChange={handler} 
                value={endHour} 
                disabled={!dayOpen} 
                required
            />
        </div>
    )
}
