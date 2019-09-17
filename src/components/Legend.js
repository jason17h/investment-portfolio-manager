import React from 'react';
// Bootstrap components
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Legend = () => (
    <div>
        <Row className="section">
            <Col>
                <Card className="legend-card">
                    <Card.Body>
                        <Card.Title>Fund MER</Card.Title>
                        <Card.Text>
                            The fund's <em>management expense ratio (MER)</em> is the cost associated with investment in the
                            fund and includes the fund's management fee, administration fee, service fee and
                            other operating expenses paid by the fund as well as GST/HST. However, it excludes
                            brokerage commission on portfolio transactions and certain other costs, 
                            such as certain taxes.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="legend-card">
                    <Card.Body>
                        <Card.Title>Service Fee</Card.Title>
                        <Card.Text>
                            The <em>service fee</em> is the fund's trailer fee which is the amount that the fund
                            manufacturer generally pays to a dealer so long as that dealer's 
                            applicant/annuitant remains invested in the fund. Service fees encourage
                            dealers/advisors to provide ongoing services to their clients after the date
                            of the purchase, for which no sales commission would otherwise be received.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row className="section">
            <Col>
                <Card className="legend-card">
                    <Card.Body>
                        <Card.Title>Fee Base %</Card.Title>
                        <Card.Text>
                            A <em>fee based</em> account offers investors an alternative to traditional front end or
                            deferred sales charge style mutual funds. Rather than a commission paid at the
                            point of sale ("front-end load") or at the point of redemption 
                            ("deferred sales charge"), in a fee based account, clients are charged a fixed transparent
                            fee to their account. These fees are deducted directly from the mutual fund account instead
                            of being applied to each transaction. The fee based account invests in what are commonly
                            known as f-class mutual funds which do not carry a front-end charge or a deferred sales
                            charge. <strong>The fee base % also includes GST/HST which is reflected in the client cost
                            and dealer compensation sections.</strong>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row className="section">
            <Col>
                <Card className="legend-card">
                    <Card.Body>
                        <Card.Title>Fund Manufacturer Cost</Card.Title>
                        <Card.Text>
                            The <em>fund manufacturer cost</em> is intended to approximate the amount received by
                            the fund manufacturer and is calculated as the client cost less the dealer's
                            compensation.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="legend-card">
                    <Card.Body>
                        <Card.Title>Dealer Compensation</Card.Title>
                        <Card.Text>
                            The <em>dealer compensation</em> equates to the service fee or the fee base multiplied
                            by the amount invested.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card className="legend-card">
                    <Card.Body>
                        <Card.Title>Client Cost</Card.Title>
                        <Card.Text>
                            The <em>client cost</em> equates to the fund's MER multiplied by the amount invested.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
)

export default Legend