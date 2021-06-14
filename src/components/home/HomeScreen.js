import React from 'react'
import { CategoriesBlock } from '../categories/CategoriesBlock'
import { LinesSection } from '../line/LinesSection'

export const HomeScreen = () => {
    return (
            <div className="home__content"> 
                <div className="ui__header">
                    <header>
                        LineApp
                    </header>
                </div>
                <div className="ui__search-bar"> BUSCADOR </div>


                <div className="home__lines"> 
                    <LinesSection />
                    {/* <CategoriesBlock /> */}
                </div>
                <footer className="ui__footer">
                    Footer
                </footer>
             </div>
    )
}
