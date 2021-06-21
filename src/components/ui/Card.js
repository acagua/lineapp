import React from 'react'
import { Link } from 'react-router-dom'
import { cardTypes } from '../../lists/cardTypes'
import { timeAlerts } from '../../lists/timeAlerts'
// import image from '../../assets/logoDummy.png';

export const Card = ({title='NO TITLE', type, branchName, serviceName, timeRemaining=null, link="/"}) => {

    //Test: Look if its better only text than changing color to the whole card
    let cardStyle = '';
    let remainingTimeStyle = '';
    if(timeRemaining !== null){
        if (timeRemaining < timeAlerts.now){
            // cardStyle = 'ui__card-now';
            remainingTimeStyle = 'ui__text-now';
        } else if (timeRemaining < timeAlerts.next){
            // cardStyle = 'ui__card-next';
            remainingTimeStyle = 'ui__text-next';
        } else {
            // cardStyle = 'ui__card-wait';
            remainingTimeStyle = 'ui__text-wait';
        }
    } 

    return (
            <Link className={`ui__card ${cardStyle}`} to={link}>
                    {/* <img src={image} alt="category logo"/> */}
                    <h3 className={'ui__card-title'}> { title } </h3>
                    {
                        (type === cardTypes.line) &&
                            <div>
                                <p> <b>Branch:</b> {branchName} </p>
                                <p> <b>Service:</b> {serviceName} </p>
                                <p className={`${remainingTimeStyle}`}> <b>Time Remaining:</b> {timeRemaining} </p>
                            </div>
                    }

            </Link>
    )
}
