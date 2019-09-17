import React from 'react';
import { connect } from 'react-redux';
import { toAccounting } from '../global';

const Difference = (props) => {
    const fundMfgCostDifference = (props.totals.fundMfgCost - props.proposedTotals.fundMfgCost).toFixed(2);
    const dealerCompensationDifference = (props.totals.dealerCompensation - props.proposedTotals.dealerCompensation).toFixed(2);
    const clientCostDifference = (props.totals.clientCost - props.proposedTotals.clientCost).toFixed(2);
    return (
        <table className="difference shadow">
            <thead>
                <tr>
                    <th colSpan="2">Current Portfolio vs. Proposed Portfolio</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Fund Manufacturer Cost</td>
                    <td className="data">${toAccounting(fundMfgCostDifference)}</td>
                </tr>
                <tr>
                    <td>Dealer Compensation</td>
                    <td className="data">${toAccounting(dealerCompensationDifference)}</td>
                </tr>
                <tr>
                    <td>Client Cost</td>
                    <td className="data">${toAccounting(clientCostDifference)}</td>
                </tr>
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => ({
    totals: state.totals,
    proposedTotals: state.proposedTotals
})

export default connect(mapStateToProps)(Difference);