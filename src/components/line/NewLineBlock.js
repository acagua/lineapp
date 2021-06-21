import React from 'react'
import { Link } from 'react-router-dom'

export const NewLineBlock = () => {
    return (
        <Link to="/companies" className="ui__card ui__card-add">
            <p className="ui__card-title"> New Line </p>
            <i className="fas fa-plus fa-5x"/>
        </Link>
    )
}
