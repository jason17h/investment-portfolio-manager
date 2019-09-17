import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import blurbReducer from "../reducers/blurb";
import fundsReducer from "../reducers/funds";
import totalsReducer from "../reducers/totals";
import suitabilityBlurbReducer from "../suitability_reducers/blurb";
import suitabilityFundsReducer from "../suitability_reducers/funds";
import suitabilityTotalsReducer from "../suitability_reducers/totals";
import suitabilityInvestmentObjectivesReducer from '../suitability_reducers/investment_objectives';
import suitabilityRiskToleranceReducer from '../suitability_reducers/risk_tolerance';
import suitabilityAnalysisReducer from '../suitability_reducers/analysis'
import { current, proposed } from '../global';

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            blurb: blurbReducer,
            funds: fundsReducer(current),
            proposedFunds: fundsReducer(proposed),
            totals: totalsReducer(current),
            proposedTotals: totalsReducer(proposed)
        }),
        applyMiddleware(thunk)
    );
    return store;
}

export const configureSuitabilityStore = () => {
    const store = createStore(
        combineReducers({
            blurb: suitabilityBlurbReducer,
            funds: suitabilityFundsReducer,
            totals: suitabilityTotalsReducer,
            investmentObjectives: suitabilityInvestmentObjectivesReducer,
            riskTolerance: suitabilityRiskToleranceReducer,
            analysis: suitabilityAnalysisReducer
        }),
        applyMiddleware(thunk)
    );
    return store;
}