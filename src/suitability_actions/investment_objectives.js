import startAnalysis from './analysis';

// EDIT_INVESTMENT_OBJECTIVES (startEditInvestmentObjectives, editInvestmentObjectives)
//   Reads in the client's investment objectives. Edits the store accordingly and updates the
//     investment objective analysis based on the changes.

const startEditInvestmentObjectives = (investmentObjectives) => {
    return (dispatch, getState) => {
        dispatch(editInvestmentObjectives(investmentObjectives));
        dispatch(startAnalysis(
            getState().funds, 
            getState().riskTolerance, 
            getState().investmentObjectives
        ));
    }
}

const editInvestmentObjectives = (investmentObjectives) => ({
    type: 'EDIT_INVESTMENT_OBJECTIVES',
    investmentObjectives
})

export default startEditInvestmentObjectives;