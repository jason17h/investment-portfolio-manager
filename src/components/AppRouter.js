import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import PortfolioFeeCalculator from './PortfolioFeeCalculator';
import SuitabilityCalculator from '../suitability_components/SuitabilityCalculator';

const AppRouter = () => {
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={PortfolioFeeCalculator} exact={true} />
                <Route path="/suitability" component={PortfolioFeeCalculator} />
            </Switch>
        </div>
    </BrowserRouter>
}

export default AppRouter;