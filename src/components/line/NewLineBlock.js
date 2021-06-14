import React from 'react'
import { Link } from 'react-router-dom'

export const NewLineBlock = () => {
    return (
        <Link to="/" className="category__card">
            <i className="fas fa-plus fa-5x"/>
            <h3> New Line </h3>
        </Link>
    )
}
