import React from 'react';
import { connect } from 'react-redux';
// Bootstrap components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 

class FundForm extends React.Component {
    state = {
        fundName: '',
        marketValue: '',
        serviceFee: '',
        fundMER: '',
        error: ''
    }
    onfundNameChange = (e) => {
        // const fundName = e.target.value.toUpperCase();
        const fundName = e.target.value
        this.setState(() => ({ fundName }));
    }
    onMarketValueChange = (e) => {
        const marketValue = e.target.value;
        if (!marketValue || marketValue.match(/^(\d{1,},{0,}){0,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ marketValue }))
        }
    }
    onMERChange = (e) => {
        const fundMER = e.target.value;
        if (!fundMER || fundMER.match(/^(\d{1,},{0,}){0,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ fundMER }))
        }
    }
    onServiceFeeChange = (e) => {
        const serviceFee = e.target.value;
        if (!serviceFee || serviceFee.match(/^(\d{1,},{0,}){0,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ serviceFee }))
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        
        const notUnique = (this.props.funds.filter((fund) => (fund.fundName === this.state.fundName))).length > 0;
        if (!this.state.fundName) {
            const error = 'Please enter a fund code.';
            this.setState(() => ({ error }));
        } else if (!this.state.marketValue) {
            const error = 'Please enter the amount invested.'
            this.setState(() => ({ error }))
        } else if (notUnique) {
            const error = 'You have already entered this fund. If you would like to change the amount invested, please click on the market value to edit.';
            this.setState(() => ({ error }));
        } else {
            this.props.onSubmit(this.state.fundName, this.state.marketValue, this.state.fundMER, this.state.serviceFee);
            const codeForError = this.state.fundName;
            const prevLength = this.props.funds.length;
            setTimeout(() => {
                const currentLength = this.props.funds.length;
                if (prevLength === currentLength) {
                    const error = `This fund with code ${codeForError} could not be found. Please verify that you have entered it correctly.`;
                    this.setState(() => ({ error }))
                }
            }, 1500)
            
            this.setState(() => ({
                fundName: '',
                marketValue: '',
                serviceFee: '',
                fundMER: '',
                error: ''
            }))
        }
       e.target.fundName.focus();
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
                                placeholder="Fund Name"
                                value={this.state.fundName}
                                onChange={this.onfundNameChange}
                                name='fundName'
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
                                className="fundform-element"
                                type="text"
                                plaintext
                                placeholder="MER %"
                                value={this.state.fundMER}
                                onChange={this.onMERChange}
                                name='fundMER'
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                className="fundform-element"
                                type="text"
                                plaintext
                                placeholder="Service Fee %"
                                value={this.state.serviceFee}
                                onChange={this.onServiceFeeChange}
                                name='serviceFee'
                            />
                        </Col>
                        <Col>
                            <Button 
                                className="fundform-button" 
                                // size="sm" 
                                type="submit" 
                                variant="primary"
                            >
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

const mapStateToProps = (state) => ({
    // funds: state.funds,
    totals: state.totals
})

export default connect(mapStateToProps)(FundForm);