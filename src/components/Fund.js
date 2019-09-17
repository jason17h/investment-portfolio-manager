import React from 'react';
import { connect } from 'react-redux';
import { toAccounting } from '../global';
// Actions
import { startRemoveFund, startEditFund } from '../actions/funds';
// Bootstrap components
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

class Fund extends React.Component {

    state = {
        marketValue: toAccounting(this.props.marketValue.toFixed(2)),
        feeBase: ''
    }

    handleChangeMarketValue = (e) => {
        const marketValue = e.target.value;
        if (!marketValue || marketValue.match(/^(\d{1,},{0,}){0,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ marketValue }))
        }
    }

    handleChangeFeeBase = (e) => {
        const feeBase = e.target.value;
        if (!feeBase || feeBase.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ feeBase }))
        }
    }

    handleSubmitMarketValue = (e) => {
        const value = parseFloat(this.state.marketValue.replace(/,/g, ""));
        if (value) {
            this.props.dispatch(startEditFund(
                this.props.fundCode, 
                {
                    ...this.props,
                    marketValue: value
                },
                this.props.portfolio
            ));
            this.setState(() => ({ marketValue: toAccounting(value.toFixed(2)) }))
        }
    }

    handleSubmitFeeBase = (e) => {
        const value = parseFloat(this.state.feeBase);
        if (value) {
            this.props.dispatch(startEditFund(
                this.props.fundCode, 
                {
                    ...this.props,
                    feeBase: value
                },
                this.props.portfolio
            ));
            this.setState(() => ({ feeBase: value.toFixed(2) }))
        }
    }
    

    
    render() {
        return (
            <tr className="fund">
                <td>
                    {this.props.fundCode}
                    {
                        !this.props.serviceFee &&
                        <span> <Badge className="fee-badge">Fee base</Badge></span>
                    }
                </td>
                <td>{this.props.fundName}</td>
                <td className="editable">
                    $<input 
                        id="market-value"
                        onChange={this.handleChangeMarketValue}
                        onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                e.target.blur();
                            }
                        }}
                        onBlur={(e) => {this.handleSubmitMarketValue(e)}}
                        placeholder='Amount'
                        value={this.state.marketValue}
                    />
                </td>
                <td>{this.props.fundMER.toFixed(2)}%</td>
                <td>
                    {
                        this.props.serviceFee &&
                        <span>{this.props.serviceFee.toFixed(2)}%</span>
                    }
                </td>
                <td className={!this.props.serviceFee ? "editable": ""}>
                    {
                        !this.props.serviceFee &&
                        <span>
                            <input 
                                id="fee-base"
                                onChange={this.handleChangeFeeBase}
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        e.target.blur();
                                    }
                                }}
                                onBlur={(e) => {this.handleSubmitFeeBase(e)}}
                                value={this.state.feeBase}
                            />%
                        </span>
                    }
                </td>
                <td>${!!this.props.fundMfgCost && toAccounting(this.props.fundMfgCost.toFixed(2))}</td>
                <td>${!!this.props.dealerCompensation && toAccounting(this.props.dealerCompensation.toFixed(2))}</td>
                <td>${!!this.props.clientCost && toAccounting(this.props.clientCost.toFixed(2))}</td>
                <td className="hide-print">
                    <Button onClick={() => {
                        this.props.dispatch(startRemoveFund(this.props.fundCode, this.props.portfolio));
                    }} size="sm" variant="danger">
                        Remove
                    </Button>
                </td>
            </tr>
        )
    }
}

export default connect()(Fund);