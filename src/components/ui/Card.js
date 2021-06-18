import React from 'react'
import { Link } from 'react-router-dom'
import { cardTypes } from '../../lists/cardTypes'
import { timeAlerts } from '../../lists/timeAlerts'
// import image from '../../assets/logoDummy.png';

export const Card = ({title='NO TITLE', type, branch, service, timeRemaining=null, link="/"}) => {

    let cardStyle = '';
    if(!timeRemaining){
        cardStyle = ''
    } else if (timeRemaining < timeAlerts.now){
        cardStyle = 'ui__card-now';
    } else if (timeRemaining < timeAlerts.next){
        cardStyle = 'ui__card-next';
    } else {
        cardStyle = 'ui__card-wait';
    }

    return (
            <Link className={`ui__card ${cardStyle}`} to={link}>
                    {/* <img src={image} alt="category logo"/> */}
                    <h3 className={'ui__card-title'}> { title } </h3>
                    {
                        (type === cardTypes.line) &&
                            <div>
                                <p> <b>Branch:</b> {branch} </p>
                                <p> <b>Service:</b> {service} </p>
                                <p> <b>Waiting Time:</b> {timeRemaining} </p>
                            </div>
                    }

            </Link>
    )
}
