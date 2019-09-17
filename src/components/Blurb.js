import React from 'react';
import { connect } from 'react-redux';
import { current, proposed } from '../global';
// Actions
import editBlurb from '../actions/blurb';
import { startEditFund } from '../actions/funds';
// Bootstrap components
import Form from 'react-bootstrap/Form';

class Blurb extends React.Component {

    handleChangeClientName = (e) => {
        const clientName = e.target.value;
        this.props.dispatch(editBlurb({ clientName }))
    }

    handleChangeAccountNumber = (e) => {
        const accountNumber = e.target.value;
        this.props.dispatch(editBlurb({ accountNumber }))
    }

    handleChangeTax = (e) => {
        const tax = e.target.value;
        if (!tax || tax.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.props.dispatch(editBlurb({ tax }))
            this.props.funds.forEach((fund) => {
                this.props.dispatch(startEditFund(fund.fundCode, fund, current))
                this.props.dispatch(startEditFund(fund.fundCode, fund, proposed))
            })
        }
    }

    render () {
        return (
            
                    <Form className="blurb">
                        <table className="blurb-content shadow">
                            <thead>
                                <tr>
                                    <th colSpan="2">Investor Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="blurb-detail">
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
                                    <td className="blurb-detail">
                                        <Form.Label>Client(s) Name:</Form.Label>
                                    </td>
                                    <td className="blurb-input">
                                        <Form.Control 
                                            className="input" 
                                            type="text" 
                                            name="clientName"
                                            placeholder="Enter client name"
                                            onChange={this.handleChangeClientName}
                                            value={this.props.blurb.clientName}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="blurb-detail">
                                        <Form.Label>Account Number:</Form.Label>
                                    </td>
                                    <td className="blurb-input">
                                        <Form.Control 
                                            className="input" 
                                            type="text" 
                                            name="accountNumber" 
                                            placeholder="Enter account number"
                                            onChange={this.handleChangeAccountNumber}
                                            value={this.props.blurb.accountNumber}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="blurb-detail">
                                        <Form.Label>HST/GST for Fee Based Only (%):</Form.Label>
                                    </td>
                                    <td className="blurb-input">
                                        <Form.Control
                                            className="input"
                                            type="text" 
                                            name="hst_gst" 
                                            id="blurb-hst-gst"
                                            placeholder="0"
                                            onKeyDown={(e) => {
                                                if (e.key == 'Enter') {
                                                    e.target.blur();
                                                }
                                            }}
                                            onChange={this.handleChangeTax}
                                            value={this.props.blurb.tax}
                                        /><span>%</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Form>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blurb: state.blurb,
        funds: state.funds
    }
}

export default connect(mapStateToProps)(Blurb);
