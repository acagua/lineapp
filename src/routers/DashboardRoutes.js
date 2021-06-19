import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HomeScreen } from '../components/home/HomeScreen';
import { AllCompaniesScreen } from '../components/companies/AllCompaniesScreen';
import { CompanyScreen } from '../components/companies/CompanyScreen';
import { CompanyBranchScreen } from '../components/companies/CompanyBranchScreen';
import { CompanyServiceScreen } from '../components/companies/CompanyServiceScreen';

import { Navbar } from '../components/ui/Navbar'
import { LineScreen } from '../components/line/LineScreen';
import { NewCompany } from '../components/admin/company/NewCompany';
import { NewBranch } from '../components/admin/company/NewBranch';
import { NewService } from '../components/admin/company/NewService';

export const DashboardRoutes = () => {
    return (
        <>  
            <Navbar />
            <div className="ui__container">
                <Switch>
                    <Route exact path="/" component ={ HomeScreen } />
                    <Route exact path="/companies" component = { AllCompaniesScreen } />
                    <Route exact path="/company/:companyId" component = { CompanyScreen } />
                    <Route exact path="/company/:companyId/branch/:branchId" component = { CompanyBranchScreen } />
                    <Route exact path="/company/:companyId/branch/:branchId/service/:serviceId" component = { CompanyServiceScreen } />
                    <Route exact path="/line/:lineId" component = { LineScreen } />
                    {/* ADMIN Routes*/}
                    <Route exact path="/new-company" component = { NewCompany } />
                    <Route exact path="/new-branch" component = { NewBranch } />
                    <Route exact path="/new-service" component = { NewService } />
                    {/* <Route exact path="/search" component = { SearchScreen } /> // TODO: Check if it adds more value having it in the HomeScreen (no additional routing) */}

                    <Redirect to="/" />
                </Switch>    
            </div>           
        </> 
    )
}
