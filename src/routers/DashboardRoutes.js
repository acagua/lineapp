import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HomeScreen } from '../components/home/HomeScreen';
import { AllCompaniesScreen } from '../components/companies/AllCompaniesScreen';
import { CompanyScreen } from '../components/companies/CompanyScreen';
import { BranchScreen } from '../components/branches/BranchScreen';
import { ServiceScreen } from '../components/services/ServiceScreen';

import { Navbar } from '../components/ui/Navbar'
import { LineScreen } from '../components/line/LineScreen';

export const DashboardRoutes = () => {
    return (
        <>  
            <Navbar />
            <div className="ui__container">
                <Switch>
                    <Route exact path="/" component ={ HomeScreen } />
                    <Route exact path="/companies" component = { AllCompaniesScreen } />
                    <Route exact path="/company/:companyId" component = { CompanyScreen } />
                    <Route exact path="/company/:companyId/branch/:branchId" component = { BranchScreen } />
                    <Route exact path="/company/:companyId/branch/:branchId/service/:serviceId" component = { ServiceScreen } />
                    <Route exact path="/line/:lineId" component = { LineScreen } />
                    {/* <Route exact path="/search" component = { SearchScreen } /> // TODO: Check if it adds more value having it in the HomeScreen (no additional routing) */}

                    <Redirect to="/" />
                </Switch>    
            </div>           
        </> 
    )
}
