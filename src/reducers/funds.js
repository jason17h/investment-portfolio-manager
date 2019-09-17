// Funds reducer

const fundsReducerDefaultState = [];

const fundsReducer = (portfolio) => (
    (state = fundsReducerDefaultState, action) => {
        switch (action.type) {
            case `ADD_FUND_${portfolio}`:
                return [
                    ...state,
                    action.fund
                ];
            case `REMOVE_FUND_${portfolio}`:
                return state.filter((fund) => (fund.fundCode != action.fundCode));
            case `EDIT_FUND_${portfolio}`:
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
)


export default fundsReducer;