import startAnalysis from './analysis';
import { updateTotals } from './totals';
import getTotals from '../suitability_selectors/totals';

// FUND ACTIONS:
//   ADD_FUND
//   REMOVE_FUND
//   EDIT_FUND

////////////////////////////////////////////////////////////////////////////////////////////////////

// ADD_FUND (startAddFund, addFund)
//   Reads in a fund code, marketvalue, and the total values.
//   Retrieves the fund with the corresponding code from the Firebase database and sets the values
//     according to the excel spreadsheet calculations.

export const startAddFund = (fund, totals) => ((dispatch, getState) => {
    // const fundData = require('../../static/funds.csv');
    // const objectiveData = require('../../static/objectives.csv');
    // const newFund = fundData.find((fund) => fund.FundservCode.toUpperCase() === fundCode.toUpperCase());
    // console.log(newFund)
    // if (!newFund) {
    //     return undefined;
    // }
    // const investmentDescription = newFund.EnglishFundName50;
    const fundName = fund.fundName;
    const marketValue = fund.marketValue
    const num = parseFloat(fund.marketValue);
    const denom = num + parseFloat(totals.marketValue);
    const allocation = (num / denom) * 100;
    let fundRisk = fund.fundRisk;
    const assetClass = fund.assetClass;
    let fundToDispatch = {
        fundName,
        marketValue: parseFloat(marketValue, 10),
        fundName,
        allocation: parseFloat(allocation, 10),
        fundRisk,
        assetClass
    }

    // const objective = objectiveData.find((objective) => objective.EnglishFundTypeName.toUpperCase() === assetClass.toUpperCase())
    // console.log(objective);
    // const growth = objective['Growth Objective'];
    // const income = objective['Income Objective '];
    // fundRisk = fundRisk ? fundRisk : objective.risk;
    let growth;
    let income;
    if (fundRisk === "Low Risk") {
        growth = 10;
        income = 90;
    }
    if (fundRisk === "Low To Medium Risk") {
        growth = 30;
        income = 70;
    }
    if (fundRisk === "Medium Risk") {
        growth = 50;
        income = 50;
    }
    if (fundRisk === "Medium To High Risk") {
        growth = 70;
        income = 30;
    }
    if (fundRisk === "High Risk") {
        growth = 90;
        income = 10;
    }
    fundToDispatch = {
        ...fundToDispatch,
        growth,
        income,
        fundRisk
    };
    dispatch(addFund(fundToDispatch));
    dispatch(updateTotals(getTotals(getState().funds)));
    dispatch(updateFundAllocations(getState().funds));
})


export const addFund = (fund) => {
    return {
        type: 'ADD_FUND',
        fund
    };
}

// REMOVE_FUND (startRemoveFund, removeFund)
//   Reads in a fund code.
//   Eliminates the fund with the corresponding fund code and updates the totals row of the funds table.

export const startRemoveFund = (fundCode) => {
    return (dispatch, getState) => {
        dispatch(removeFund(fundCode));
        dispatch(updateTotals(getTotals(getState().funds)));
        dispatch(updateFundAllocations(getState().funds));
    }
}

export const removeFund = (fundCode) => ({ 
    type: 'REMOVE_FUND',
    fundCode
})

// updateFundAllocations:
//   Reads in the list of funds.
//   Updates the allocation of each fund - used when adding/removing/editing fund market values.

export const updateFundAllocations = (funds) => {
    return (dispatch, getState) => {
        if (funds === undefined || funds.length === 0) {
            dispatch(startAnalysis(
                getState().funds, 
                getState().riskTolerance, 
                getState().investmentObjectives
            ));
        } else {
            funds.forEach((fund) => {
                const num = parseFloat(fund.marketValue);
                const denom = getState().totals.marketValue;
                const newAllocation = (num / denom) * 100;
                const updates = {
                    ...fund,
                    allocation: newAllocation
                };
                dispatch(editFund(fund.fundCode, updates));
                dispatch(startAnalysis(
                    getState().funds, 
                    getState().riskTolerance, 
                    getState().investmentObjectives
                ));
            })
        }
    }
}

// EDIT_FUND (startEditFund, editFund)
//   Reads in a fund code and the changes made to the fund.
//   Makes the necessary changes (contained in the updates parameter) to the fund with the 
//     corresponding fund code. Updates the totals row of the funds table as needed.

export const startEditFund = (fundCode, updates) => {
    return (dispatch, getState) => {
        dispatch(editFund(fundCode, updates));
        dispatch(updateTotals(getTotals(getState().funds)));
        dispatch(updateFundAllocations(getState().funds));
    }
}

export const editFund = (fundCode, updates) => ({
    type: 'EDIT_FUND',
    fundCode,
    updates
})



