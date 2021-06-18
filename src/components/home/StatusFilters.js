import React from 'react'
import { timeAlerts } from '../../lists/timeAlerts'

export const StatusFilters = () => {
    const handleStatusFilter = (alert) => {
        if(alert === timeAlerts.now)
        {
            // TODO use selector -> filter linesDisplayed
        } else if(alert === timeAlerts.next)
        {
            // TODO use selector -> filter linesDisplayed
        } else if(alert === timeAlerts.wait)
        {
            // TODO use selector -> filter linesDisplayed
        } else {
            // TODO use selector ->  linesDisplayed = AllLines
        }
    }
    return (
        <div>
            <button onClick={() => { handleStatusFilter(timeAlerts.now)}} className="ui__card ui__card-now btn-no-text" />
            <button onClick={() => { handleStatusFilter(timeAlerts.next)}} className="ui__card ui__card-next btn-no-text" />
            <button onClick={() => { handleStatusFilter(timeAlerts.wait)}} className="ui__card ui__card-wait btn-no-text" />
            <button onClick={() => { handleStatusFilter(timeAlerts.all)}} className="ui__card btn-no-text" />
        </div>
    )
}
