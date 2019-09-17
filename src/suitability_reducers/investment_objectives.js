// Investment Objectives Reducer

const investmentObjectivesReducerDefaultState = {
    growth: '',
    income: '',
}

const investmentObjectivesReducer = (state = investmentObjectivesReducerDefaultState, action) => {
    switch(action.type) {
        case 'EDIT_INVESTMENT_OBJECTIVES':
            return {
                ...state,
                ...action.investmentObjectives
            };
        default:
            return state;
    }
}

export default investmentObjectivesReducer;