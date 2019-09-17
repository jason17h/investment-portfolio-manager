import startAnalysis from './analysis';

// EDIT_RISK_TOLERANCE (startEditRiskTolerance, editRiskTolerance)
//   Reads in the client's risk tolerance. Edits the store accordingly and updates the
//     risk tolerance analysis based on the changes.

const startEditRiskTolerance = (riskTolerance) => {
    return (dispatch, getState) => {
        dispatch(editRiskTolerance(riskTolerance));
        dispatch(startAnalysis(
            getState().funds, 
            getState().riskTolerance, 
            getState().investmentObjectives
        ));
    }
}

const editRiskTolerance = (riskTolerance) => ({
    type: 'EDIT_RISK_TOLERANCE',
    riskTolerance
})

export default startEditRiskTolerance;