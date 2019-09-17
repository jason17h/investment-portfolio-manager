import React from 'react';
// Bootstrap components
import Badge from 'react-bootstrap/Badge';

const Disclaimer = () => (
    <div className="disclaimer small">
        <p>
            * The Portfolio Suitability Assessment <em><strong>only</strong></em> takes fund risk and
            objective factors into account. You are obligated to take into account the client's time horizon
            in determining the overall suitability. This tool should only be used as a guideline. The risk
            rating incorprated into the spreadsheet is updated on a monthly basis; however, please refer
            to the most current fund facts for the up to date risk rating of the fund.
        </p>
        <p>
            * If the suitability assessment indicates <Badge variant="danger">Unsuitable</Badge>, 
            it is necessary to determine whether portfolio holdings meet the investor's stated investment
            objectives and risk tolerance of the account as set out under <strong>each </strong>
            risk/objective category in the KYC information.
        </p>
    </div>
)

export default Disclaimer;