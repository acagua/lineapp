import React from 'react'
import { useDispatch } from 'react-redux';
import { startLoadingLines } from '../../redux/actions/lines';
import { LinesSection } from '../line/LinesSection'


export const HomeScreen = () => {

    const dispatch = useDispatch();

    const handleUpdate = ()=>{
        dispatch(startLoadingLines("ENdvLiJJ1hRVcHjKnkG6LU5hb0M2"));
    }
    return (
        <>
            <button onClick={handleUpdate}> UPDATE LINES </button>
                {/* <div className="ui__search-bar"> SearchComponent </div> */}
                <div className="home__lines"> 
                    <LinesSection />
                </div>
        </>
    )
}
