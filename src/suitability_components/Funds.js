import React from 'react';
import { connect } from 'react-redux';
import getTotals from '../suitability_selectors/totals';
// Components
import Fund from './Fund';
import Total from './Total';
import AddFund from './AddFund';
// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const Funds = (props) => (
    <Card className="shadow funds">
        <Card.Title id="funds-title">
            Mutual Funds
        </Card.Title>
        <Card.Body>
            <Table responsive className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Market Value</th>
                        <th>Allocation</th>
                        <th>Risk</th>
                        <th>Asset Class</th>
                        <th>Growth</th>
                        <th>Income</th>
                        <th className="hide-print"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.funds.map((fund) => (
                            <Fund key={fund.fundCode} {...fund} />
                        ))
                    }
                    <Total 
                        dispatch={props.dispatch} 
                        marketValue={props.totals.marketValue.toString()} 
                        allocation={props.totals.allocation}
                        funds={props.funds}
                    />
                </tbody>
            </Table>
            <div className="hide-print">
                    <Row>
                        <Col sm={7}>
                            <AddFund portfolio={props.portfolio} funds={props.funds} />
                        </Col>
                        <Col sm={5} />
                    </Row>
                </div>
        </Card.Body>
    </Card>
)

const mapStateToProps = (state) => {
    return {
        funds: state.funds,
        totals: getTotals(state.funds)
    }
}

export default connect(mapStateToProps)(Funds);
