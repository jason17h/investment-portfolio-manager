import React from 'react';
//Bootstrap components
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class FundForm extends React.Component {
    state = {
        fundCode: '',
        marketValue: '',
        'fundRisk': '',
        assetClass: '',
        error: ''
    }
    onFundCodeChange = (e) => {
        const fundCode = e.target.value;
        this.setState(() => ({ fundCode }));
    }
    onMarketValueChange = (e) => {
        const marketValue = e.target.value;
        if (!marketValue || marketValue.match(/^(\d{1,},{0,}){0,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ marketValue }))
        }
    }
    onFundRiskChange = (e) => {
        const fundRisk = e.target.value;
        this.setState (() => ({ fundRisk }))
    }
    onAssetClassChange = (e) => {
        const assetClass = e.target.value;
        this.setState (() => ({ assetClass }))
    }
    onSubmit = (e) => {
        e.preventDefault();
        const notUnique = (this.props.funds.filter((fund) => (fund.fundCode === this.state.fundCode))).length > 0;
        if (!this.state.fundCode) {
            const error = 'Please enter a fund code.';
            this.setState(() => ({ error }));
        } else if (!this.state.marketValue) {
            const error = 'Please enter the amount invested.'
            this.setState(() => ({ error }))
        } else if (notUnique) {
            const error = 'You have already entered this fund.';
            this.setState(() => ({ error }));
        } else {
            this.props.onSubmit(this.state.fundCode, this.state.marketValue, this.state.fundRisk, this.state.assetClass);
            const codeForError = this.state.fundCode;
            const prevLength = this.props.funds.length;
            setTimeout(() => {
                const currentLength = this.props.funds.length;
                if (prevLength === currentLength) {
                    const error = `This fund with code ${codeForError} could not be found. Please verify that you have entered it correctly.`;
                    this.setState(() => ({ error }))
                }
            }, 2000)
            this.setState(() => ({
                marketValue: '',
                fundCode: '',
                fundRisk: '',
                assetClass: '',
                error: ''
            }))
        }
        e.target.fundCode.focus();
    }

    render() {
        return (
            <div className="fundform">
                <Form className="fundform-form" onSubmit={this.onSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column >Add a fund: </Form.Label>
                        <Col>
                            <Form.Control
                                className="fundform-element"
                                type="text"
                                plaintext
                                placeholder="Fund Code"
                                value={this.state.fundCode}
                                onChange={this.onFundCodeChange}
                                name='fundCode'
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                className="fundform-element"
                                type="text"
                                plaintext
                                placeholder="Market Value $"
                                value={this.state.marketValue}
                                onChange={this.onMarketValueChange}
                                name='marketValue'
                            />
                        </Col>
                        <Col>
                            <Form.Control 
                                className="input" 
                                as="select" 
                                name="fundRisk"
                                onChange={this.onFundRiskChange}
                            >
                                <option />
                                <option>Low Risk</option>
                                <option>Low To Medium Risk</option>
                                <option>Medium Risk</option>
                                <option>Medium To High Risk</option>
                                <option>High Risk</option>
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control
                                className="fundform-element"
                                type="text"
                                plaintext
                                placeholder="Asset Class"
                                value={this.state.assetClass}
                                onChange={this.onAssetClassChange}
                                name='assetZclass'
                            />
                        </Col>
                        <Col>
                            <Button
                                className="fundform-button"
                                variant="primary"
                                // size="sm"
                                type="submit">
                                Add fund
                            </Button>
                        </Col>
                    </Form.Group>
                    {this.state.error && <p className="small error">{this.state.error}</p>}
                </Form>
            </div>
        )
    }
}
