import React from 'react'

export const OpeningHours = ( { day="NONE", dayOpen="NONE", openName="NONE", startHour="NONE", startName="NONE", endHour="NONE", endName="NONE", handler}) => {
    return (
        <>
            <div>
                <input 
                    id={`${day}-open`}
                    type="checkbox" 
                    name={openName}
                    onChange={handler} 
                    checked={dayOpen}
                />
                <label htmlFor={`${day}-open`}>{day.charAt(0).toUpperCase() + day.substring(1,3)}</label>
            </div>
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
        </>
    )
}
