// getTotals:
//   calculates the total value of each column in the funds table based on the list of funds passed.

const getTotals = (funds) => {
    let totalMarketValue = 0;
    let totalDealerCompensation = 0;
    let totalClientCost = 0;
    funds.forEach((fund) => {
        totalMarketValue += fund.marketValue;
        totalDealerCompensation += parseFloat(fund.dealerCompensation);
        totalClientCost += (parseFloat(fund.clientCost) ? parseFloat(fund.clientCost) : 0);
    }) 
    let totalFundMER = (totalMarketValue !== 0) ? ((totalClientCost / totalMarketValue) * 100) : undefined;
    let totalServiceFee = (totalMarketValue !== 0) ?  ((totalDealerCompensation / totalMarketValue) * 100) : undefined;
    let totalFundMfgCost = totalClientCost ?  (totalClientCost - totalDealerCompensation) : undefined;
    
    let fundMfgCost = totalFundMfgCost ? parseFloat(totalFundMfgCost).toFixed(2) : 0;
    if (fundMfgCost < 0) {
        fundMfgCost = totalClientCost.toFixed(2);
    }

    const updatedTotals = {
        marketValue: totalMarketValue ? parseFloat(totalMarketValue).toFixed(2) : 0,
        fundMER: totalFundMER ? parseFloat(totalFundMER).toFixed(2) : 0,
        serviceFee: totalServiceFee ? parseFloat(totalServiceFee).toFixed(2) : 0,
        fundMfgCost,
        dealerCompensation: totalDealerCompensation ? parseFloat(totalDealerCompensation).toFixed(2) : 0,
        clientCost: totalClientCost ? parseFloat(totalClientCost).toFixed(2) : 0
    }
    return updatedTotals
}

export default getTotals;