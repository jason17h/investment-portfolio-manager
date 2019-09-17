// Blurb reducer

const blurbReducerDefaultState = {
    date: '',
    clientName: '',
    age: '',
    investmentKnowledge: '',
    annualIncome: '',
    netWorth: '',
    timeHorizons: '',
    notes: ''
}

const blurbReducer = (state = blurbReducerDefaultState, action) => {
    switch (action.type) {
        case 'EDIT_BLURB':
            return {
                ...state,
                ...action.blurb
            }
        default:
            return state;
    }
}

export default blurbReducer;