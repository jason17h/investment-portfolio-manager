import getTotals from '../selectors/totals';
import { current, proposed } from '../global';

// UPDATE_TOTALS (startUpdateTotals, updateTotals)
//   Reads in the portfolio.
//   Calculates the total value of each column in the funds table.

export const startUpdateTotals = (portfolio) => {
    return (dispatch, getState) => {
        if (portfolio === current) {
            dispatch(updateTotals(getTotals(getState().funds), portfolio));
        } else if (portfolio === proposed) {
            dispatch(updateTotals(getTotals(getState().proposedFunds), portfolio));
        } else {
            console.log('###ERROR: NO PORTFOLIO IDENTIFIED###');
        }
    }
}

export const updateTotals = (totals, portfolio) => ({
    type: `UPDATE_TOTALS_${portfolio}`,
    totals
})