// Risk Tolerance Reducer

const riskToleranceReducerDefaultState = {
    low: '',
    lowToMedium: '',
    medium: '',
    mediumToHigh: '',
    high: ''
}

const riskToleranceReducer = (state = riskToleranceReducerDefaultState, action) => {
    switch(action.type) {
        case 'EDIT_RISK_TOLERANCE':
            return {
                ...state,
                ...action.riskTolerance
            };
        default:
            return state;
    }
}

export default riskToleranceReducer;