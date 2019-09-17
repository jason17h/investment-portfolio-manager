// UPDATE_TOTALS (startUpdateTotals, updateTotals)
//   Reads in the portfolio.
//   Calculates the total value of each column in the funds table.

export const updateTotals = (totals) => ({
    type: 'UPDATE_TOTALS',
    totals
})