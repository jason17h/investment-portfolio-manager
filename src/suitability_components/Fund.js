import React from 'react';
import { connect } from 'react-redux';
import getTotals from '../suitability_selectors/totals';
import { toAccounting } from '../global';
// Actions
import { startRemoveFund, startEditFund } from '../suitability_actions/funds';
// Bootstrap components
import Button from 'react-bootstrap/Button';

class Fund extends React.Component {

    state = {
        marketValue: toAccounting(this.props.marketValue.toFixed(2))
    }

    handleChange = (e) => {
        const marketValue = e.target.value;
        if (!marketValue || marketValue.match(/^(\d{1,},{0,}){0,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ marketValue }))
        }
    }

    handleSubmit = (e) => {
        const value = parseFloat(this.state.marketValue.replace(/,/g, ""));
        if (value) {
            this.props.dispatch(startEditFund(this.props.fundCode, {
                ...this.props,
                marketValue: value
            }));
            this.setState(() => ({ marketValue: toAccounting(value.toFixed(2)) }))
        }
    }

    render () {
        return (
            <tr className="fund">
                <td className="fund-name">{this.props.fundName}</td>
                <td className="editable">
                    $<input
                    id="market-value"
                    onChange={this.handleChange}
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            e.target.blur();
                        }
                    }}
                    onBlur={(e) => {this.handleSubmit(e)}}
                    placeholder='New market value'
                    value={this.state.marketValue}
                    />
                </td>
                <td>{this.props.allocation.toFixed(2)}%</td>

                <td>{this.props.fundRisk}</td>
                <td className="fund-asset-class">{this.props.assetClass}</td>
                <td>{this.props.growth}</td>
                <td>{this.props.income}</td>
                <td className="hide-print">
                    <Button onClick={() => {
                        this.props.dispatch(startRemoveFund(this.props.fundCode));
                    }} size="sm" variant="danger">
                        Remove
                    </Button>
                </td>
            </tr>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        blurb: state.blurb,
        funds: state.funds,
        totals: getTotals(state.funds)
    }
}

export default connect(mapStateToProps)(Fund);
