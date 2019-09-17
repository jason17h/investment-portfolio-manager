import React from 'react';
import { connect } from 'react-redux';
import { startRemoveFund } from '../suitability_actions/funds';
import editBlurb from '../suitability_actions/blurb';
import editInvestmentObjectives from '../suitability_actions/investment_objectives';
import editRiskTolerance from '../suitability_actions/risk_tolerance';
import logo from '../../images/wfm-logo.jpg';
import { Link } from 'react-router-dom';
// Components
// import Header from './Header';
import Blurb from './Blurb';
import Notes from './Notes';
import Targets from './Targets';
import Analysis from './Analysis';
import Funds from './Funds';
import Disclaimer from './Disclaimer';
// Bootstrap Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Modal from 'react-bootstrap/Modal';

export class SuitabilityCalculator extends React.Component {

    state = {
        showModal: false
    }

    popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Suitability Calculator Help</Popover.Title>
            <Popover.Content>
                <p> Welcome to the WFM Portfolio Suitability Calculator.</p>
                <p>
                    To get started, enter your client(s)'s information,
                    risk tolerance and investment objectives in the gold <strong>Investor Details </strong>
                    and <strong>Risk Tolerance & Investment Objectives</strong> tables above.
                </p>
                <p>
                    Enter the desired mutual fund codes in the <strong>Add a fund </strong> 
                    component of the mutual funds section. The corresponding mutual fund should appear in the table.
                </p>
                <p>
                    To change the market value of a fund, click on the cell to edit.
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
    print = () => {
        window.print()
    }
    clearInput = () => {
        this.props.funds.forEach((fund) => {
            this.props.dispatch(startRemoveFund(fund.fundCode));
        })
        this.props.dispatch(editBlurb({
            date: '',
            clientName: '',
            age: '',
            investmentKnowledge: '',
            annualIncome: '',
            netWorth: '',
            timeHorizons: '',
            notes: ''
        }))
        this.props.dispatch(editInvestmentObjectives({
            growth: '',
            income: '',
        }))
        this.props.dispatch(editRiskTolerance({
            low: '',
            lowToMedium: '',
            medium: '',
            mediumToHigh: '',
            high: ''
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
                    <Modal.Body>Would you like to clear your portfolio? This action cannot be undone.</Modal.Body>
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
                            <Targets />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Notes />
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
                            <Funds />
                        </Col>
                    </Row>
                    <Row className="section">
                        <Col>
                            <Analysis
                                analysisType={this.props.analysis.risk}
                                title="Risk Analysis"
                            />
                        </Col>
                    </Row>
                    <Row className="section">
                        <Col>
                            <Analysis
                                analysisType={this.props.analysis.objective}
                                title="Investment Objective Analysis"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        funds: state.funds,
        analysis: state.analysis
    }
}

export default connect(mapStateToProps)(SuitabilityCalculator);

// export default ConnectedPortfolioFeeCalculator
