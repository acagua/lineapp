import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
// import { AllIdeasScreen } from '../components/ideas/AllIdeasScreen'
// import { IdeaDetailScreen } from '../components/ideas/IdeaDetailScreen'
// import { NewIdeaScreen } from '../components/ideas/NewIdeaScreen'
// import { OwnerIdeasScreen } from '../components/ideas/OwnerIdeasScreen'
import { HomeScreen } from '../components/home/HomeScreen';

import { Navbar } from '../components/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <>  
            <Navbar />
            <div className="container mt-2">
                <Switch>
                    <Route exact path="/" component ={ HomeScreen } />
                    {/* <Route exact path="/new" component = { NewIdeaScreen } />
                    <Route exact path="/all" component = { AllIdeasScreen } />
                    <Route exact path="/idea/:ideaId" component = { IdeaDetailScreen } /> */}
                    {/* <Route exact path="/hero/:heroId" component = { HeroScreen } /> */}
                    
                    {/* <Route exact path="/search" component = { SearchScreen } /> */}

                    <Redirect to="/" />
                </Switch>    
            </div>           
        </> 
    )
}
