import analysisReducerDefaultState from '../suitability_reducers/analysis';

import { suitable, unsuitable } from '../global';

// ANALYZE (startAnalysis, analyze)
//   Reads in the list of funds and the client's (actual) risk tolerance and investment objective.
//   Calculates the suitability of the portfolio and actual vs. target portfolio discrepancies.
//     Calculations are based on those on the excel spreadsheet.

const startAnalysis = (funds, riskTolerance, investmentObjective) => {
  return (dispatch, getState) => {
    if (!funds) {
        dispatch(analysisReducerDefaultState);
        return;
    }

    const lowRisk = riskTolerance.low ? riskTolerance.low : 0;
    const lowToMediumRisk = riskTolerance.lowToMedium ? riskTolerance.lowToMedium : 0;
    const mediumRisk = riskTolerance.medium ? riskTolerance.medium : 0;
    const mediumToHighRisk = riskTolerance.mediumToHigh ? riskTolerance.mediumToHigh : 0;
    const highRisk = riskTolerance.high ? riskTolerance.high : 0;

    const growthObjective = investmentObjective.growth ? investmentObjective.growth : 0;
    const incomeObjective = investmentObjective.income ? investmentObjective.income : 0;

    let lowMarketValue = 0;
    let lowToMediumMarketValue = 0;
    let mediumMarketValue = 0;
    let mediumToHighMarketValue = 0;
    let highMarketValue = 0;
    const lowKYC = parseFloat(lowRisk);
    const lowToMediumKYC = parseFloat(lowToMediumRisk);
    const mediumKYC = parseFloat(mediumRisk);
    const mediumToHighKYC = parseFloat(mediumToHighRisk);
    const highKYC = parseFloat(highRisk);
    let lowPortfolioAssessment = 0;
    let lowToMediumPortfolioAssessment = 0;
    let mediumPortfolioAssessment = 0;
    let mediumToHighPortfolioAssessment = 0;
    let highPortfolioAssessment = 0;
    let growthMarketValue = 0;
    let incomeMarketValue = 0;
    const growthKYC = parseFloat(growthObjective);
    const incomeKYC = parseFloat(incomeObjective);
    let growthPortfolioAssessment = 0;
    let incomePortfolioAssessment = 0;
    funds.forEach(fund => {
      if (fund.fundRisk.toUpperCase().includes("LOW")) {
        if (fund.fundRisk.toUpperCase().includes("TO")) {
            lowToMediumMarketValue += fund.marketValue;
            lowToMediumPortfolioAssessment += fund.allocation;
        } else {
          lowMarketValue += fund.marketValue;
          lowPortfolioAssessment += fund.allocation;
        }
      } else if (
        fund.fundRisk.toUpperCase().includes("MEDIUM") ||
        fund.fundRisk.toUpperCase().includes("MODERATE")
      ) {
        if (fund.fundRisk.toUpperCase().includes("TO")) {
          mediumToHighMarketValue += fund.marketValue;
          mediumToHighPortfolioAssessment += fund.allocation;
        } else {
          mediumMarketValue += fund.marketValue;
          mediumPortfolioAssessment += fund.allocation;
        }
      } else if (fund.fundRisk.toUpperCase().includes("HIGH")) {
        highMarketValue += fund.marketValue;
        highPortfolioAssessment += fund.allocation;
      } else {
        console.log("ERROR - UNACCOUNTED FOR RISK TYPE");
      }
      if (parseFloat(fund.growth) > 0) {
        growthMarketValue += fund.marketValue * (parseFloat(fund.growth) / 100);
      }
      if (parseFloat(fund.income) > 0) {
        incomeMarketValue += fund.marketValue * (parseFloat(fund.income) / 100);
      }
    });

    growthPortfolioAssessment = (growthMarketValue / getState().totals.marketValue) * 100;
    growthPortfolioAssessment = growthPortfolioAssessment ? growthPortfolioAssessment : 0;

    incomePortfolioAssessment = (incomeMarketValue / getState().totals.marketValue) * 100;
    incomePortfolioAssessment = incomePortfolioAssessment ? incomePortfolioAssessment : 0;

    const overflow = 10;

    const highAnalysis = parseFloat(highRisk) + overflow - highPortfolioAssessment;
    const mediumToHighAnalysis = parseFloat(mediumToHighRisk) + Math.max(highAnalysis, 0) - mediumToHighPortfolioAssessment;
    const mediumAnalysis = parseFloat(mediumRisk) + Math.max(mediumToHighAnalysis, 0) - mediumPortfolioAssessment;
    const lowToMediumAnalysis = parseFloat(lowToMediumRisk) + Math.max(mediumAnalysis, 0) - lowToMediumPortfolioAssessment;
    const lowAnalysis = parseFloat(lowRisk) + Math.max(lowToMediumAnalysis, 0);

    // console.log('32 --->', lowAnalysis);
    // console.log('33 --->', lowToMediumAnalysis);
    // console.log('34 --->', mediumAnalysis);
    // console.log('35 --->', mediumToHighAnalysis);
    // console.log('36 --->', highAnalysis);

    const low = 'L';
    const lowToMed = 'LTM';
    const med = 'M';
    const medToHigh = 'MTH';
    const high = 'H';
    const checkTarget = (riskType) => {
        if (riskType === lowToMed) {
            return (
                lowToMediumRisk > 0 ||
                mediumRisk > 0 ||
                mediumToHighRisk > 0 ||
                highRisk > 0
            )
        } else if (riskType === med) {
            return (
                mediumRisk > 0 ||
                mediumToHighRisk > 0 ||
                highRisk > 0
            )
        } else if (riskType === medToHigh) {
            return (
                mediumToHighRisk > 0 ||
                highRisk > 0
            )
        } else if (riskType === high) {
            return (
                highRisk > 0
            )
        }
    }

    const checkRiskSuitability = (target, analysis, actual, riskType) => {
        if (riskType == high) {
            analysis = overflow;
        }
        if (riskType === low ) {
            if (((lowToMediumKYC + mediumKYC + mediumToHighKYC + highKYC)
                - (lowToMediumPortfolioAssessment + mediumPortfolioAssessment + mediumToHighPortfolioAssessment + highPortfolioAssessment)
                + overflow) > 0) {
                return suitable;
            } else {
                return unsuitable;
            }
        } else if (analysis + target >= actual && actual === 0) {
            return suitable;
        } else if ((target + analysis >= actual) && (checkTarget(riskType))) {
            return suitable;
        } else {
            return unsuitable;
        }
    }

    const growthSuitability = () => {
          if (growthKYC + overflow >= growthPortfolioAssessment) {
              return suitable;
          } else {
              return unsuitable;
          }
    }

    const incomeSuitability = () => {
          if (incomeKYC - overflow <= incomePortfolioAssessment) {
              return suitable;
          } else {
              return unsuitable;
          }
    }

    const analysisToDispatch = {
      risk: [
        {
          analysis: "Low Risk",
          marketValue: lowMarketValue.toFixed(2),
          suitabilityAssessment: checkRiskSuitability(
              lowKYC,
              lowAnalysis,
              lowPortfolioAssessment,
              low
          ),
          kyc: lowKYC.toFixed(2),
          portfolioAssessment: lowPortfolioAssessment.toFixed(2),
          discrepancies: (lowKYC - lowPortfolioAssessment).toFixed(2)
        },
        {
          analysis: "Low to Medium Risk",
          marketValue: lowToMediumMarketValue.toFixed(2),
          suitabilityAssessment: checkRiskSuitability(
              lowToMediumKYC,
              Math.max(mediumAnalysis, 0),
              lowToMediumPortfolioAssessment,
              lowToMed
            ),
          kyc: lowToMediumKYC.toFixed(2),
          portfolioAssessment: lowToMediumPortfolioAssessment.toFixed(2),
          discrepancies: (
            lowToMediumKYC - lowToMediumPortfolioAssessment
          ).toFixed(2)
        },
        {
          analysis: "Medium Risk",
          marketValue: mediumMarketValue.toFixed(2),
          suitabilityAssessment: checkRiskSuitability(
            mediumKYC,
            Math.max(mediumToHighAnalysis, 0),
            mediumPortfolioAssessment,
            med
          ),
          kyc: mediumKYC.toFixed(2),
          portfolioAssessment: mediumPortfolioAssessment.toFixed(2),
          discrepancies: (mediumKYC - mediumPortfolioAssessment).toFixed(2)
        },
        {
          analysis: "Medium to High Risk",
          marketValue: mediumToHighMarketValue.toFixed(2),
          suitabilityAssessment: checkRiskSuitability(
            mediumToHighKYC,
            Math.max(highAnalysis, 0),
            mediumToHighPortfolioAssessment,
            medToHigh
          ),
          kyc: mediumToHighKYC.toFixed(2),
          portfolioAssessment: mediumToHighPortfolioAssessment.toFixed(2),
          discrepancies: (
            mediumToHighKYC - mediumToHighPortfolioAssessment
          ).toFixed(2)
        },
        {
          analysis: "High Risk",
          marketValue: highMarketValue.toFixed(2),
          suitabilityAssessment: checkRiskSuitability(
            highKYC,
            highAnalysis,
            highPortfolioAssessment,
            high
          ),
          kyc: highKYC.toFixed(2),
          portfolioAssessment: highPortfolioAssessment.toFixed(2),
          discrepancies: (highKYC - highPortfolioAssessment).toFixed(2)
        }
      ],
      objective: [
        {
          analysis: "Growth",
          marketValue: growthMarketValue.toFixed(2),
          suitabilityAssessment: growthSuitability(),
          kyc: growthKYC.toFixed(2),
          portfolioAssessment: growthPortfolioAssessment.toFixed(2),
          discrepancies: (growthKYC - growthPortfolioAssessment).toFixed(2)
        },
        {
          analysis: "Income",
          marketValue: incomeMarketValue.toFixed(2),
          suitabilityAssessment: incomeSuitability(),
          kyc: incomeKYC.toFixed(2),
          portfolioAssessment: incomePortfolioAssessment.toFixed(2),
          discrepancies: (incomeKYC - incomePortfolioAssessment).toFixed(2)
        }
      ]
    };
    dispatch(analyze(analysisToDispatch));
  };
};

const analyze = analysisToDispatch => {
  return {
    type: "ANALYZE",
    analysisToDispatch
  };
};

export default startAnalysis;
