import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import editBlurb from '../suitability_actions/blurb';

const Blurb = (props) => {
    const handleChangeClientName = (e) => {
        const clientName = e.target.value;
        props.dispatch(editBlurb({ clientName }))
    }
    const handleChangeAge = (e) => {
        const age = e.target.value;
        props.dispatch(editBlurb({ age }))
    }
    const handleChangeInvestmentKnowledge = (e) => {
        const investmentKnowledge = e.target.value;
        props.dispatch(editBlurb({ investmentKnowledge }))
    }
    const handleChangeAnnualIncome = (e) => {
        const annualIncome = e.target.value;
        props.dispatch(editBlurb({ annualIncome }))
    }
    const handleChangeNetWorth = (e) => {
        const netWorth = e.target.value;
        props.dispatch(editBlurb({ netWorth }))
    }
    const handleChangeTimeHorizons = (e) => {
        const timeHorizons = e.target.value;
        props.dispatch(editBlurb({ timeHorizons }))
    }
    return (
        <div className="blurb shadow">
            <Form className="blurb-form">
                <table className="blurb-content">
                    <thead>
                        <tr>
                            <th colSpan="2">Investor Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Label>Date:</Form.Label>
                            </td>
                            <td className="blurb-input">
                                <Form.Control 
                                    className="input" 
                                    type="date" 
                                    name="date"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Client Name:</Form.Label>
                            </td>
                            <td className="blurb-input">
                                <Form.Control 
                                    className="input" 
                                    type="text" 
                                    name="clientName" 
                                    placeholder="Enter client name"
                                    onChange={handleChangeClientName}
                                    value={props.blurb.clientName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Age:</Form.Label>
                            </td>
                            <td className="blurb-input">
                                <Form.Control 
                                    className="input" 
                                    type="text" 
                                    name="age" 
                                    placeholder="Enter age"
                                    onChange={handleChangeAge}
                                    value={props.blurb.age}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Investment Knowledge:</Form.Label>
                            </td>
                            <td className="blurb-input">
                                <Form.Control 
                                    className="input" 
                                    as="select" 
                                    name="investmentKnowledge"
                                    onChange={handleChangeInvestmentKnowledge}
                                    value={props.blurb.investmentKnowledge}
                                >
                                    <option />
                                    <option>Sophisticated</option>
                                    <option>Good</option>
                                    <option>Fair</option>
                                    <option>Poor</option>
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Annual Income:</Form.Label>
                            </td>
                            <td className="blurb-input">
                                <Form.Control 
                                    className="input"
                                    as="select" 
                                    name="annualIncome"
                                    onChange={handleChangeAnnualIncome}
                                    value={props.blurb.annualIncome}
                                >
                                    <option />
                                    <option>Less than $30,000</option>
                                    <option>$30,001 to $50,000</option>
                                    <option>$50,000 to $70,000</option>
                                    <option>$70,001 to $100,000</option>
                                    <option>More than $100,000</option>
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Net Worth:</Form.Label>
                            </td>
                            <td className="blurb-input">
                                <Form.Control 
                                    className="input" 
                                    as="select" 
                                    name="netWorth"
                                    onChange={handleChangeNetWorth}
                                    value={props.blurb.netWorth}
                                >
                                    <option />
                                    <option>Less than $50,000</option>
                                    <option>$50,001 to $100,000</option>
                                    <option>$100,000 to $240,000</option>
                                    <option>$240,001 to $1,000,000</option>
                                    <option>More than $1,000,000</option>
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Time Horizons:</Form.Label>
                            </td>
                            <td className="blurb-input">
                                <Form.Control 
                                    className="input" 
                                    as="select" 
                                    name="timeHorizons"
                                    onChange={handleChangeTimeHorizons}
                                    value={props.blurb.timeHorizons}
                                >
                                    <option />
                                    <option>0-2 years</option>
                                    <option>3-4 years</option>
                                    <option>5-9 years</option>
                                    <option>10-20 years</option>
                                    <option>21+ years</option>
                                </Form.Control>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    blurb: state.blurb
})

export default connect(mapStateToProps)(Blurb);
