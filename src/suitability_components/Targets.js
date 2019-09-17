import React from 'react';
import { connect } from 'react-redux';
import editInvestmentObjectives from '../suitability_actions/investment_objectives';
import editRiskTolerance from '../suitability_actions/risk_tolerance';

import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

class Targets extends React.Component {
    // state = {
    //     lowRisk: '',
    //     lowToMediumRisk: '',
    //     mediumRisk: '',
    //     mediumToHighRisk: '',
    //     highRisk: '',
    //     growth: '',
    //     income: ''
    // }
    findObjectiveTotal = () => {
        const total = (
            (this.props.investmentObjectives.growth ? parseFloat(this.props.investmentObjectives.growth) : 0)
            + (this.props.investmentObjectives.income ? parseFloat(this.props.investmentObjectives.income) : 0)
        )
        return total
    }
    findRiskTotal = () => {
        const total = (
            (this.props.riskTolerance.low ? parseFloat(this.props.riskTolerance.low) : 0)
            + (this.props.riskTolerance.lowToMedium ? parseFloat(this.props.riskTolerance.lowToMedium) : 0)
            + (this.props.riskTolerance.medium ? parseFloat(this.props.riskTolerance.medium) : 0)
            + (this.props.riskTolerance.mediumToHigh ? parseFloat(this.props.riskTolerance.mediumToHigh) : 0)
            + (this.props.riskTolerance.high ? parseFloat(this.props.riskTolerance.high) : 0)
        )
        return total
    }

    handleChangeLowRisk = (e) => {
        const risk = e.target.value
        if (!risk || risk.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.props.dispatch(editRiskTolerance({ low: risk }))
        }
    }
    handleChangeLowToMediumRisk = (e) => {
        const risk = e.target.value;
        if (!risk || risk.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.props.dispatch(editRiskTolerance({ lowToMedium: risk }))
        }
    }
    handleChangeMediumRisk = (e) => {
        const risk = e.target.value;
        if (!risk || risk.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.props.dispatch(editRiskTolerance({ medium: risk }))
        }
    }
    handleChangeMediumToHighRisk = (e) => {
        const risk = e.target.value;
        if (!risk || risk.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.props.dispatch(editRiskTolerance({ mediumToHigh: risk }))
        }
    }
    handleChangeHighRisk = (e) => {
        const risk = e.target.value;
        if (!risk || risk.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.props.dispatch(editRiskTolerance({ high: risk }))
        }
    }
    handleChangeGrowth = (e) => {
        const objective = e.target.value;
        if (!objective || objective.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.props.dispatch(editInvestmentObjectives({ growth: objective }))
        }
    }
    handleChangeIncome = (e) => {
        const objective = e.target.value;
        if (!objective || objective.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.props.dispatch(editInvestmentObjectives({ income: objective }))
        }
    }

    // handleSubmitLowRisk = () => {
    //     const risk = this.state.lowRisk ? this.state.lowRisk: 0;
    //     this.props.dispatch(editRiskTolerance({ low: risk }))
    // }
    // handleSubmitLowToMediumRisk = () => {
    //     const risk = this.state.lowToMediumRisk ? this.state.lowToMediumRisk : 0;
    //     this.props.dispatch(editRiskTolerance({ lowToMedium: risk }))
    // }
    // handleSubmitMediumRisk = () => {
    //     const risk = this.state.mediumRisk ? this.state.mediumRisk : 0;
    //     this.props.dispatch(editRiskTolerance({ medium: risk }))
    // }
    // handleSubmitMediumToHighRisk = () => {
    //     const risk = this.state.mediumToHighRisk ? this.state.mediumToHighRisk : 0;
    //     this.props.dispatch(editRiskTolerance({ mediumToHigh: risk }))
    // }
    // handleSubmitHighRisk = () => {
    //     const risk = this.state.highRisk ? this.state.highRisk : 0;
    //     this.props.dispatch(editRiskTolerance({ high: risk }))
    // }
    // handleSubmitGrowth = () => {
    //     const objective = this.state.growth ? this.state.growth : 0;
    //     this.props.dispatch(editInvestmentObjectives({ growth: objective }))
    // }
    // handleSubmitIncome = () => {
    //     const objective = this.state.income ? this.state.income : 0;
    //     this.props.dispatch(editInvestmentObjectives({ income: objective }))
    // }

    render () {
        return (
            <div className="targets shadow">
                <Form className="targets-form">
                    <table className="targets-content">
                        <thead>
                            <tr>
                                <th colSpan="2">Risk Tolerance & Investment Objective (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Form.Label>Low Risk:</Form.Label>
                                </td>
                                <td className="targets-input">
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        name="low"
                                        id="low-risk"
                                        placeholder="0"
                                        onKeyDown={(e) => {
                                            if (e.key == 'Enter') {
                                                e.target.blur();
                                            }
                                        }}
                                        onChange={this.handleChangeLowRisk}
                                        // onBlur={this.handleSubmitLowRisk}
                                        value={this.props.riskTolerance.low}
                                    /> %
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Label>Low to Medium Risk:</Form.Label>
                                </td>
                                <td className="targets-input">
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        name="lowToMedium"
                                        id="low-to-medium-risk"
                                        placeholder="0"
                                        onKeyDown={(e) => {
                                            if (e.key == 'Enter') {
                                                e.target.blur();
                                            }
                                        }}
                                        onChange={this.handleChangeLowToMediumRisk}
                                        // onBlur={this.handleSubmitLowToMediumRisk}
                                        value={this.props.riskTolerance.lowToMedium}
                                    /> %
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Label>Medium Risk:</Form.Label>
                                </td>
                                <td className="targets-input">
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        name="medium"
                                        id="medium-risk"
                                        placeholder="0"
                                        onKeyDown={(e) => {
                                            if (e.key == 'Enter') {
                                                e.target.blur();
                                            }
                                        }}
                                        onChange={this.handleChangeMediumRisk}
                                        // onBlur={this.handleSubmitMediumRisk}
                                        value={this.props.riskTolerance.medium}
                                    /> %
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Label>Medium to High Risk:</Form.Label>
                                </td>
                                <td className="targets-input">
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        name="mediumToHigh"
                                        id="medium-to-high-risk"
                                        placeholder="0"
                                        onKeyDown={(e) => {
                                            if (e.key == 'Enter') {
                                                e.target.blur();
                                            }
                                        }}
                                        onChange={this.handleChangeMediumToHighRisk}
                                        // onBlur={this.handleSubmitMediumToHighRisk}
                                        value={this.props.riskTolerance.mediumToHigh}
                                    /> %
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Label>High Risk:</Form.Label>
                                </td>
                                <td className="targets-input">
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        name="high"
                                        id="high-risk"
                                        placeholder="0"
                                        onKeyDown={(e) => {
                                            if (e.key == 'Enter') {
                                                e.target.blur();
                                            }
                                        }}
                                        onChange={this.handleChangeHighRisk}
                                        // onBlur={this.handleSubmitHighRisk}
                                        value={this.props.riskTolerance.high}
                                    /> %
                                </td>
                            </tr>
                            <tr className="targets-total">
                                <td>
                                    <Form.Label>Total:</Form.Label>
                                </td>
                                <td className="targets-input">
                                {
                                    this.findRiskTotal() > 100 ?
                                    <Badge variant="danger">
                                        OVER 100%
                                    </Badge> :
                                    // <span>{this.findRiskTotal()} %</span>
                                    <span>
                                        <Form.Control
                                            className="input"
                                            readOnly
                                            value={this.findRiskTotal()}  
                                        /> <strong>%</strong>
                                    </span>
                                    
                                }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Label>Growth:</Form.Label>
                                </td>
                                <td className="targets-input">
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        name="growth"
                                        id="investment-objective-growth"
                                        placeholder="0"
                                        onKeyDown={(e) => {
                                            if (e.key == 'Enter') {
                                                e.target.blur();
                                            }
                                        }}
                                        onChange={this.handleChangeGrowth}
                                        // onBlur={this.handleSubmitGrowth}
                                        value={this.props.investmentObjectives.growth}
                                    /> %
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Form.Label>Income:</Form.Label>
                                </td>
                                <td className="targets-input">
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        name="income"
                                        id="investment-objective-income"
                                        placeholder="0"
                                        onKeyDown={(e) => {
                                            if (e.key == 'Enter') {
                                                e.target.blur();
                                            }
                                        }}
                                        onChange={this.handleChangeIncome}
                                        // onBlur={this.handleSubmitIncome}
                                        value={this.props.investmentObjectives.income}
                                    /> %
                                </td>
                            </tr>
                            <tr className="targets-total">
                                <td>
                                    <Form.Label>Total:</Form.Label>
                                </td>
                                <td className="targets-input">
                                        {
                                            this.findObjectiveTotal() > 100 ?
                                            <Badge variant="danger">
                                                OVER 100%
                                            </Badge> :
                                            <span>
                                                <Form.Control
                                                    className="input"
                                                    readOnly
                                                    value={this.findObjectiveTotal()}  
                                                /> <strong>%</strong>
                                            </span>
                                        }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    investmentObjectives: state.investmentObjectives,
    riskTolerance: state.riskTolerance
})

export default connect(mapStateToProps)(Targets)
