// getTotals:
//   calculates the total value of each column in the funds table based on the list of funds passed.

const getTotals = (funds) => {
    let totalMarketValue = 0;
    let totalAllocation = 0;
    funds.forEach((fund) => {
        totalMarketValue += fund.marketValue;
        totalAllocation += fund.allocation;
    }) 
    const updatedTotals = {
        marketValue: totalMarketValue ? parseFloat(totalMarketValue).toFixed(2) : 0,
        allocation: totalAllocation ? parseFloat(totalAllocation).toFixed(2) : 0,
    }
    return updatedTotals
}

export default getTotals;