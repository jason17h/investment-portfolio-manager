import React from 'react';
import { connect } from 'react-redux';
// Actions
import { startAddFund } from '../suitability_actions/funds';
// Components
import FundForm from './FundForm'


const AddFund = (props) => {
    const onSubmit = (fundName, rawMarketValue, fundRisk, assetClass) => {
        const marketValue = rawMarketValue.replace(/,/g, "");
        const fund = {
            fundName,
            marketValue,
            fundRisk,
            assetClass
        }
        props.dispatch(startAddFund(fund, props.totals))
    }
    return (
        <div className="addfund">
            <FundForm className="addfund-element" onSubmit={onSubmit} funds={props.funds} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    funds: state.funds,
    riskTolerance: state.riskTolerance,
    analysis: state.analysis, // temporary, can deletee later
    totals: state.totals
})
    
export default connect(mapStateToProps)(AddFund);