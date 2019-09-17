// Blurb reducer

const blurbReducerDefaultState = {
    date: '',
    clientName: '',
    accountNumber: '',
    tax: ''
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