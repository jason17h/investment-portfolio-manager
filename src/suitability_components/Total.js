import React from 'react';
import { toAccounting } from '../global';
import { startRemoveFund } from '../suitability_actions/funds';
import Button from 'react-bootstrap/Button'; 

const Total = ({marketValue, allocation, funds, dispatch}) => {
    const clearFunds = () => {
        funds.forEach((fund) => {
            dispatch(startRemoveFund(fund.fundCode));
        })
    }
    return (
        <tr className="total">
            <td>Total:</td>
            <td>$
                <input
                    readOnly
                    value={toAccounting(marketValue)}
                />
            </td>
            <td>{allocation}%</td>
            <td colSpan={5} />
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
