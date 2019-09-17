import React from 'react';
import { toAccounting } from '../global';
import { startRemoveFund } from '../actions/funds';
import Button from 'react-bootstrap/Button';

const Total = ({
    marketValue,
    fundMER,
    serviceFee,
    fundMfgCost,
    dealerCompensation,
    clientCost,
    dispatch,
    funds,
    portfolio
}) => {
    const clearFunds = () => {
        funds.forEach((fund) => {
            dispatch(startRemoveFund(fund.fundCode, portfolio));
        })
    }
    return (
        <tr className="total">
            <td colSpan="2">Total:</td>
            <td>
                $
                <input
                    readOnly
                    value={toAccounting(marketValue.toString())}
                />
            </td>
            <td>{fundMER}%</td>
            <td>{serviceFee}%</td>
            <td></td>
            <td>${toAccounting(fundMfgCost.toString())}</td>
            <td>${toAccounting(dealerCompensation.toString())}</td>
            <td>${toAccounting(clientCost.toString())}</td>
            <td className="hide-print">
                <Button 
                    variant="danger" 
                    id="clear-funds-button" 
                    size="sm"
                    onClick={clearFunds}
                >
                    Clear
                </Button>
            </td>
        </tr>
    ) 
}

export default Total;
