import React from 'react';
import { connect } from 'react-redux';
// Components
import Fund from './Fund';
import Total from './Total';
import AddFund from './AddFund';
// Bootstrap components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const Funds = (props) => {

    return (
        <Card className="shadow funds">
            <Card.Title id="funds-title">
                {props.portfolio} 
            </Card.Title>
            <Card.Body>
                <Table responsive className="table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>Market Value</th>
                            <th>MER</th>
                            <th>Service Fee</th>
                            <th>Fee Base</th>
                            <th>Fund Manufacturer Cost</th>
                            <th>Dealer Compensation</th>
                            <th>Client Cost</th>
                            <th className="hide-print"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.funds.map((fund) => (
                                <Fund key={fund.fundCode} {...fund} portfolio={props.portfolio} />
                            ))
                        }
                        <Total 
                            {...props.totals} 
                            dispatch={props.dispatch} 
                            funds={props.funds}
                            portfolio={props.portfolio} 
                        />
                    </tbody>
                </Table>
                <div className="hide-print">
                    <Row>
                        <Col sm={12}>
                            <AddFund portfolio={props.portfolio} funds={props.funds} />
                        </Col>
                        {/*<Col sm={2} />*/}
                    </Row>
                </div>
                    
                   
            </Card.Body>
        </Card>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         funds: state.funds,
//         totals: getTotals(state.funds)
//     }
// }

export default connect()(Funds);