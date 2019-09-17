import React from 'react';
import { toAccounting, suitable } from '../global';
// Bootstrap components
import Badge from 'react-bootstrap/Badge';


const AnalysisItem = (props) => {
    return (
        <tr>
            <td>{props.item.analysis}</td>
            <td>${toAccounting(props.item.marketValue.toString())}</td>
            <td>
                <Badge variant={props.item.suitabilityAssessment === suitable ? "success" : "danger"}>
                    {props.item.suitabilityAssessment}
                </Badge>
            </td>
            <td>{props.item.kyc}%</td>
            <td>{props.item.portfolioAssessment}%</td>
            <td>{props.item.discrepancies}%</td>
        </tr>
    )
}

export default AnalysisItem;