// NOTE:
// This is the outdated funds.js action file which originally used Firebase to store the mutual fund & growth/income objective data.
// It is no longer being used (but is kept for reference).

import db from './firebase/firebase';
import { startUpdateTotals } from './totals';

// FUND ACTIONS:
//   ADD_FUND
//   REMOVE_FUND
//   EDIT_FUND

////////////////////////////////////////////////////////////////////////////////////////////////////

// ADD_FUND (startAddFund, addFund)
//   Reads in a fund code, marketvalue, and the portfolio (current or proposed).
//   Retrieves the fund with the corresponding code from the Firebase database and sets the values
//     according to the excel spreadsheet calculations.

export const startAddFund = (fundCode, marketValue, portfolio) => {
    return (dispatch) => {
        db.ref().orderByChild('FundservCode').equalTo(fundCode).on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                const newFund = childSnapshot.val();
        const newFundName = newFund.EnglishFundName50;
        const newFundMER = newFund.MER ? parseFloat(newFund.MER) : 0;
        const findServiceFee = () => {
            const load = newFund.LoadType;
            if (load.includes('No Load')) {
                return parseFloat(newFund.TrailerFeeMaxNoLoadPercent);
            } else if (load.includes('Back End') || load.includes('Low Service')) {
                return parseFloat(newFund.TrailerFeeMaxBackEndPercent);
            } else if (load.includes('Front End') || load.includes('Initial Service')) {
                return parseFloat(newFund.TrailerFeeMaxFrontEndPercent);
            } else {
                return 'ERROR: UNNACOUNTED FOR LOAD TYPE';
            }
        }
        const newServiceFee = findServiceFee() ? findServiceFee() : undefined;
        const newFeeBase = 0;
        const findDealerCompensation = () => {
            if (newServiceFee) {
                return marketValue * (newServiceFee / 100);
            } else {
                return 0;
            }
        }
        const newDealerCompensation = findDealerCompensation();
        const findClientCost = () => {
            if (newFundMER) {
                if (newServiceFee) {
                    return marketValue * (newFundMER / 100);
                } else {
                    return 0;
                }
            }
        }
        const newClientCost = findClientCost();
        const newFundMfgCost = newClientCost ? Math.max(0, newClientCost-newDealerCompensation) : 0;

        const fundToDispatch = {
            fundCode: fundCode,
            marketValue: parseFloat(marketValue, 10),
            fundName: newFundName,
            fundMER: newFundMER,
            serviceFee: newServiceFee,
            feeBase: newFeeBase,
            fundMfgCost: parseFloat(newFundMfgCost),
            dealerCompensation: parseFloat(newDealerCompensation),
            clientCost: parseFloat(newClientCost),
        }
        dispatch(addFund(fundToDispatch, portfolio));
        dispatch(startUpdateTotals(portfolio))
            })
        })
    }
}

export const addFund = (fund, portfolio) => {
    return {
        type: `ADD_FUND_${portfolio}`,
        fund
    };
}

// REMOVE_FUND (startRemoveFund, removeFund)
//   Reads in a fund code and the portfolio.
//   Eliminates the fund with the corresponding fund code and updates the totals row of the funds table.

export const startRemoveFund = (fundCode, portfolio) => {
    return (dispatch) => {
        dispatch(removeFund(fundCode, portfolio));
        dispatch(startUpdateTotals(portfolio));
    }
}

export const removeFund = (fundCode, portfolio) => ({ 
    type: `REMOVE_FUND_${portfolio}`,
    fundCode
})

// EDIT_FUND (startEditFund, editFund)
//   Reads in a fund code, changes made to the fund and the portfolio.
//   Makes the necessary changes (contained in the updates parameter) to the fund with the 
//     corresponding fund code. Updates the totals row of the funds table as needed.

export const startEditFund = (fundCode, updates, portfolio) => {
    return (dispatch, getState) => {
        const tax = getState().blurb.tax;
        const merPercent = updates.fundMER / 100;
        const serviceFeePercent = updates.serviceFee / 100;
        const feeBasePercent = updates.feeBase / 100;
        const taxPercent = tax / 100;
        const findDealerCompensation = () => {
            if (updates.serviceFee) {
                return updates.marketValue * serviceFeePercent;
            } else if (updates.feeBase) {
                return updates.marketValue * feeBasePercent * (1 + taxPercent);
            } else {
                return 0;
            }
        }
        const dealerCompensation = findDealerCompensation();
        const findClientCost = () => {
            if (updates.serviceFee) {
                return updates.marketValue * merPercent;
            } else if (updates.feeBase) {
                return (updates.marketValue * merPercent) + (feeBasePercent * updates.marketValue * (1 + taxPercent));
            } else {
                return 0;
            }
        }
        const clientCost = findClientCost();
        const fundMfgCost = clientCost ? Math.max(0, clientCost-dealerCompensation) : 0;
        const newUpdates = {
            ...updates,
            dealerCompensation: parseFloat(dealerCompensation.toFixed(2)),
            clientCost: parseFloat(clientCost.toFixed(2)),
            fundMfgCost: parseFloat(fundMfgCost.toFixed(2))
        }
        dispatch(editFund(fundCode, newUpdates, portfolio));
        dispatch(startUpdateTotals(portfolio));
    }
}

export const editFund = (fundCode, updates, portfolio) => ({
    type: `EDIT_FUND_${portfolio}`,
    fundCode,
    updates
})



