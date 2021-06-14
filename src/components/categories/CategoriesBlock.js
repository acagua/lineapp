import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card'

const categories = [
    {
        title: 'Bancos',
        id: 1,
    },
    {
        title: 'Restaurante',
        id:2,
    },
    {
        title: 'Salud',
        id:3,
    },
    {
        title: 'Telecomunicaciones',
        id:4,
    },
    {
        title: 'Aerolineas',
        id:5,
    },
    {
        title: 'Eventos',
        id:6,
    }]
    ;

export const CategoriesBlock = () => {
    return (
        <>
            <header>
                <h2>
                    Categories
                </h2>
            </header>
            <div className="category__content">
                {
                    categories.map( (category, index) => (
                        <Card
                        key={index}
                        {...category}
                        />
                    ))
                }
            </div>
        </>
    )
}
