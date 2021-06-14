import React from 'react'
import image from '../../assets/logoDummy.png';

export const Card = ({title, branch, eta}) => {
    return (
        <div className="ui__card">
            {/* <img src={image} alt="category logo"/> */}
            <h3> { title } </h3>
            <p> { branch } </p>
            <p> { eta } </p>
            <a href="#"> Ver mas... </a>
        </div>
    )
}
