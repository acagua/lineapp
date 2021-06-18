import React from 'react'
import { LinesSection } from '../line/LinesSection'


export const HomeScreen = () => {
    return (
        <>
            <div className="home__content"> 
                {/* <div className="ui__search-bar"> SearchComponent </div> */}
                <div className="home__lines"> 
                    <LinesSection />
                </div>
             </div>
            {/* <footer className="ui__footer">
                Footer
            </footer> */}
        </>
    )
}
