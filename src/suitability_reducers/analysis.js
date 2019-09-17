const analysisReducerDefaultState = {
    risk: [
        {
            analysis: 'Low Risk',
            marketValue: 0,
            suitabilityAssessment: '',
            kyc: '',
            portfolioAssessment: 0,
            discrepancies: 0
        },
        {
            analysis: 'Low to Medium Risk',
            marketValue: 0,
            suitabilityAssessment: '',
            kyc: '',
            portfolioAssessment: 0,
            discrepancies: 0
        },
        {
            analysis: 'Medium Risk',
            marketValue: 0,
            suitabilityAssessment: '',
            kyc: '',
            portfolioAssessment: 0,
            discrepancies: 0
        },
        {
            analysis: 'Medium to High Risk',
            marketValue: 0,
            suitabilityAssessment: '',
            kyc: '',
            portfolioAssessment: 0,
            discrepancies: 0
        },
        {
            analysis: 'High Risk',
            marketValue: 0,
            suitabilityAssessment: '',
            kyc: '',
            portfolioAssessment: 0,
            discrepancies: 0
        },
    ],
    objective: [
        {
            analysis: 'Growth',
            marketValue: 0,
            suitabilityAssessment: '',
            kyc: '',
            portfolioAssessment: 0,
            discrepancies: 0
        },
        {
            analysis: 'Income',
            marketValue: 0,
            suitabilityAssessment: '',
            kyc: '',
            portfolioAssessment: 0,
            discrepancies: 0
        }
    ]
}

const analysisReducer = (state = analysisReducerDefaultState, action) => {
    switch (action.type) {
        // case 'RISK':
        //     return {
        //         ...state,
        //         risk: action.analysisToDispatch
        //     }
        // case 'OBJECTIVE':
        //     return {
        //         ...state,
        //         objective: action.analysisToDispatch
        //     }
        case 'ANALYZE':
            return {
                ...state,
                ...action.analysisToDispatch
            }
        // case 'ANALYZE':
        //     for (riskType in state) {
        //         if (riskType === action.item.analysis) {
        //             return {
        //                 ...state,
        //                 ...action.analysisToDispatch
        //             }
        //         }
        //     }
        default: return state;
    }
}

export default analysisReducer;