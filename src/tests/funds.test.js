import { addFund, removeFund, editFund } from '../actions/funds';

const fund = {
    fundCode: 'myFundCode',
    fundName: 'myFundName',
    marketValue: 'myMarketValue',
    fundMER: 'myMER',
    serviceFee: 'myServiceFee',
    feeBase: 'myFeeBase',
    fundMfgCost: 'myMfgCost',
    dealerCompensation: 'myDealerComp',
    clientCost: 'myClientCost'
}

const portfolio = 'myPortfolio';

test('should set up add fund action object', () => {
    const action = addFund(fund, portfolio)
    expect(action).toEqual({
        type: `ADD_FUND_myPortfolio`,
         fund: {
            fundCode: 'myFundCode',
            fundName: 'myFundName',
            marketValue: 'myMarketValue',
            fundMER: 'myMER',
            serviceFee: 'myServiceFee',
            feeBase: 'myFeeBase',
            fundMfgCost: 'myMfgCost',
            dealerCompensation: 'myDealerComp',
            clientCost: 'myClientCost'
        }
    })
})

test('should set up remove fund action object', () => {
    const action = removeFund(fund.fundCode, portfolio);
    expect(action).toEqual({
        type: 'REMOVE_FUND_myPortfolio',
        fundCode: 'myFundCode'
    })
});

test('should set up edit fund action object', () => {
    const action = editFund(fund.fundCode, fund, portfolio);
    expect(action).toEqual({
        type: 'EDIT_FUND_myPortfolio',
        fundCode: 'myFundCode',
        updates: {
            fundCode: 'myFundCode',
            fundName: 'myFundName',
            marketValue: 'myMarketValue',
            fundMER: 'myMER',
            serviceFee: 'myServiceFee',
            feeBase: 'myFeeBase',
            fundMfgCost: 'myMfgCost',
            dealerCompensation: 'myDealerComp',
            clientCost: 'myClientCost'
        }
    })
})