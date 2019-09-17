import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
// Components
import AnalysisItem from './AnalysisItem';
// Bootstrap components
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';


const Analysis = (props) => {
    const kycData = {
        labels: props.analysisType.map((item) => (item.analysis)),
        datasets: [{
            data: props.analysisType.map((item) => item.kyc),
            backgroundColor: [
                'rgb(1, 38, 57)',
                'rgb(187, 157, 19)',
                'rgb(160, 173, 138)',
                'rgb(107, 136, 178)',
                'rgb(125, 100, 120)',
                // 'rgb(125, 60, 152)',
                // 'rgb(172, 172, 83)',
                // 'rgb(159, 96, 96)'
            ]
        }],
    }
    const portfolioAssessmentData = {
        labels: props.analysisType.map((item) => (item.analysis)),
        datasets: [{
            data: props.analysisType.map((item) => item.portfolioAssessment),
            backgroundColor: [
                'rgb(1, 38, 57)',
                'rgb(187, 157, 19)',
                'rgb(160, 173, 138)',
                'rgb(107, 136, 178)',
                'rgb(125, 100, 120)',
            ]
        }],
    }
    return (
        <div className="analysis">
            <Card className="shadow">
                <Card.Title id="analysis-title">{props.title}</Card.Title>
                <Card.Body>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Analysis</th>
                                <th>Market Value</th>
                                <th>Suitability</th>
                                <th>KYC</th>
                                <th>Portfolio Assessment</th>
                                <th>KYC & Portfolio Discrepancies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.analysisType.map((item) => (
                                    <AnalysisItem key={item.analysis} item={item} />
                                ))
                            }
                        </tbody>
                    </Table>
                    <Collapse in={props.funds.length > 0}>
                        <Row className="chart-row">
                            <Col className="chart-col" lg={6}>
                                    <Pie 
                                        data={kycData}
                                        options={{
                                            maintainAspectRatio: true,
                                            title: {
                                                display: true,
                                                text: 'KYC'
                                            },
                                            tooltips: {
                                                callbacks: {
                                                    label: (tooltipItem, data) => {
                                                        const dataset = data.datasets[tooltipItem.datasetIndex];
                                                        const dataPoint = dataset.data[tooltipItem.index];
                                                        const label = data.labels[tooltipItem.index];
                                                        return `${label}: ${dataPoint}%`;
                                                    }
                                                }
                                            },
                                            legend: {
                                                labels: {
                                                    generateLabels: function(chart) {
                                                        var data = chart.data;
                                                        const total = data.datasets[0].data.reduce((previousValue, currentValue, currentIndex, array) => {
                                                            return parseFloat(previousValue) + parseFloat(currentValue);
                                                        });
                                                        if (data.labels.length && data.datasets.length) {
                                                            return data.labels.map(function(label, i) {
                                                                const dataPoint = data.datasets[0].data[i];
                                                                const percentage = dataPoint;
                                                                return {
                                                                    text: `${label} (${percentage}%)`,
                                                                    fillStyle: data.datasets[0].backgroundColor[i],
                                                                    // Extra data used for toggling the correct item
                                                                    index: i
                                                                };
                                                            });
                                                        }
                                                        return [];
                                                    }
                                                }
                                            }
                                        }}
                                    />
                            </Col>
                            <Col className="chart-col" lg={6}>
                                {
                                    props.funds.length > 0 &&
                                    <Pie 
                                        className="pie-chart"
                                        data={portfolioAssessmentData}
                                        options={{
                                            maintainAspectRatio: true,
                                            title: {
                                                display: true,
                                                text: 'Portfolio Analysis'
                                            },
                                            tooltips: {
                                                callbacks: {
                                                    label: (tooltipItem, data) => {
                                                        const dataset = data.datasets[tooltipItem.datasetIndex];
                                                        const dataPoint = dataset.data[tooltipItem.index];
                                                        const label = data.labels[tooltipItem.index];
                                                        return `${label}: ${dataPoint}%`;
                                                    }
                                                }
                                            },
                                            legend: {
                                                labels: {
                                                    generateLabels: function(chart) {
                                                        var data = chart.data;
                                                        const total = data.datasets[0].data.reduce((previousValue, currentValue, currentIndex, array) => {
                                                            return parseFloat(previousValue) + parseFloat(currentValue);
                                                        });
                                                        console.log(data);
                                                        if (data.labels.length && data.datasets.length) {
                                                            return data.labels.map(function(label, i) {
                                                                const dataPoint = data.datasets[0].data[i]
                                                                const percentage = (dataPoint * 100 / total).toFixed(2);
                                                                return {
                                                                    text: `${label} (${percentage}%)`,
                                                                    fillStyle: data.datasets[0].backgroundColor[i],
                                                                    // Extra data used for toggling the correct item
                                                                    index: i
                                                                };
                                                            });
                                                        }
                                                        return [];
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                }
                            </Col>
                        </Row>
                    </Collapse>
                </Card.Body>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => ({
    funds: state.funds
})

export default connect(mapStateToProps)(Analysis);
