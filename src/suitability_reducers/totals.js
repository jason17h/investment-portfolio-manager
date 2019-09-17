const totalsReducerDefaultState = {
    marketValue: 0,
    fundMER: 0,
    serviceFee: 0,
    feeBase: 0,
    fundMfgCost: 0,
    dealerCompensation: 0,
    clientCost: 0
}

const totalsReducer = (state = totalsReducerDefaultState, action) => {
    switch (action.type) {
        case 'UPDATE_TOTALS':
            return {
                ...state,
                ...action.totals
            }
        default:
            return state;
    }
}

export default totalsReducer;