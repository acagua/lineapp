import React from 'react'
import { LinesSection } from '../line/LinesSection'
import loaderGif from "../../assets/loader.gif";
import { useSelector } from 'react-redux';

export const HomeScreen = () => {

    const { loading } = useSelector( state => state.ui );

    if(loading){
        return (
            <>
                <div className="ui__loader">
                    <img
                        src={ loaderGif }
                        alt="loader"
                    />
                </div>
            </>
        )
    } 
    return (
        <>
                {/* <div className="ui__search-bar"> SearchComponent </div> */}
                <div className="home__lines"> 
                    <LinesSection />
                </div>
        </>
    )
}
