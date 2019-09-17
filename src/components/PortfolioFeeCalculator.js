import React from 'react';
import { connect } from 'react-redux';
import { startRemoveFund } from '../actions/funds';
import editBlurb from '../actions/blurb';
// Components
import Blurb from './Blurb';
import Funds from './Funds';
import Difference from './Difference';
import CostChart from './CostChart';
// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Modal from 'react-bootstrap/Modal';

import { current, proposed } from '../global';

export class PortfolioFeeCalculator extends React.Component {

    state = {
        compare: false,
        showModal: false
    }

    popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Fee Calculator Help</Popover.Title>
            <Popover.Content>
                <p> Welcome to the WFM Portfolio Fee Calculator.</p>
                <p>
                    To get started, enter your client(s)'s information in the gold <strong>Investor Details</strong> table above.
                </p>
                <p>
                    Enter the desired mutual fund codes in the <strong>Add a fund </strong> 
                    component of the current portfolio section. The corresponding mutual fund should appear in the table.
                </p>
                <p>
                    For funds that are fee based, enter the fee base percentage in the <em>Fee base %</em> column.
                </p>
                <p>
                    Cells in the table with <em>gold highlights</em> (excluding the <em>Totals</em> row) can be edited.
                    To change the market value or fee base percentage of a mutual fund, click on the value to edit.
                </p>
                <p>
                    To compare the client(s)'s current portfolio with a proposed portfolio, click the <strong>Compare portfolios</strong> button.
                </p>
                <p>
                    To analyze a new client's portfolio, refresh the page or click the <strong>Clear input</strong> button to the right.
                </p>
            </Popover.Content>
        </Popover>
      );

    showModal = () => {
        this.setState(() => ({ showModal: true }))
    }
    closeModal = () => {
        this.setState(() => ({ showModal: false }))
    }

    toggleCompare = () => {
        this.setState((prevState) => ({ compare: !prevState.compare }))
    }
    print = () => {
        window.print()
    }
    clearInput = () => {
        this.props.funds.forEach((fund) => {
            this.props.dispatch(startRemoveFund(fund.fundCode, current));
        })
        this.props.proposedFunds.forEach((fund) => {
            this.props.dispatch(startRemoveFund(fund.fundCode, proposed));
        })
        this.props.dispatch(editBlurb({
            date: '',
            clientName: '',
            accountNumber: '',
            tax: 0
        }))
        this.setState(() => ({ showModal: false }))
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Clear input</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Would you like to clear your portfolios? This action cannot be undone.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={this.clearInput}>
                        Clear input
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Container id="main-section">
                    <Row className="section">
                        <Col>
                            <Blurb />
                        </Col>
                        <Col>
                            <Collapse in={this.state.compare} >
                                <div className="collapse-div">
                                    <span><Difference /></span>
                                </div>
                            </Collapse>
                        </Col>
                    </Row>

                    <div className="section hide-print" id="print-and-clear-button-section">
                        <OverlayTrigger trigger="click" placement="left" overlay={this.popover}>
                            <Button variant="secondary">Help</Button>
                        </OverlayTrigger>
                        <Button
                            variant="success"
                            onClick={this.print}
                            id="print-button"
                        >
                            Print
                        </Button>
                        <Button
                            variant="danger"
                            onClick={this.showModal}
                            id="clear-all-button"
                        >
                            Clear all input
                        </Button>
                    </div>

                    <Row className="section">
                        <Col>
                            <Funds 
                                portfolio={current}
                                funds={this.props.funds} 
                                totals={this.props.totals}
                            />
                        </Col>
                        
                    </Row>
                    <div className="section hide-print" id="comparison-button-section">
                        <Button
                            onClick={this.toggleCompare}
                            id="comparison-button"
                        >
                            {this.state.compare ? <span>Hide portfolio comparison</span> : <span>Compare portfolios</span>}
                        </Button>
                    </div>
                    
                    <Collapse in={this.state.compare}>
                        <Row className="section">
                            <Col>
                                <Funds 
                                    portfolio={proposed}
                                    funds={this.props.proposedFunds} 
                                    totals={this.props.proposedTotals}
                                />
                            </Col>
                            
                        </Row>
                    </Collapse>

                    <Row  className="justify-content-around">
                        <Col sm={6}>
                            {
                                this.props.funds.length > 0 &&
                                <CostChart totals={this.props.totals} portfolio={current} />
                            }
                        </Col>
                        <Col sm={6}>
                            <Collapse in={this.state.compare}>
                                <div className="collapse-div">
                                    
                                        {
                                            this.props.proposedFunds.length > 0 &&
                                            <CostChart totals={this.props.proposedTotals} portfolio={proposed} />
                                        }
                                </div>
                            </Collapse>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blurb: state.blurb,
        funds: state.funds,
        proposedFunds: state.proposedFunds,
        totals: state.totals,
        proposedTotals: state.proposedTotals
    }
}

export default connect(mapStateToProps)(PortfolioFeeCalculator);