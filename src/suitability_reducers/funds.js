// Funds reducer

const fundsReducerDefaultState = [];

const fundsReducer = (state = fundsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_FUND':
            return [
                ...state,
                action.fund
            ];
        case 'REMOVE_FUND':
            return state.filter((fund) => (fund.fundCode != action.fundCode));
        case 'EDIT_FUND':
            return state.map((fund) => {
                if (fund.fundCode === action.fundCode) {
                    return {
                        ...fund,
                        ...action.updates
                    };
                } else {
                    return fund;
                }
            })
        default:
            return state;
    }
}

export default fundsReducer;