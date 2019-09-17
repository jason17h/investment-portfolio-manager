import React from 'react';
import { connect } from 'react-redux';
// Actions
import { startAddFund } from '../actions/funds';
// Components
import FundForm from './FundForm'

const AddFund = (props) => {
    const onSubmit = (fundName, rawMarketValue, fundMER, serviceFee) => {
        const marketValue = rawMarketValue.replace(/,/g, "");
        const fund = {
            fundName,
            marketValue,
            fundMER,
            serviceFee
        }
        console.log('fund:', fund)
        props.dispatch(startAddFund(fund, props.portfolio))
    }
    return (
        <div className="addfund">
            <FundForm className="addfund-element" onSubmit={onSubmit} funds={props.funds} />
        </div>
        )
}

export default connect()(AddFund);
