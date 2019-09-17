import React from 'react';
import { Pie } from 'react-chartjs-2';

const CostChart = (props) => {
    const data = {
        labels: ['Fund Manufacturer Cost', 'Dealer Compensation'],
        datasets: [{
            data: [props.totals.fundMfgCost, props.totals.dealerCompensation],
            backgroundColor: [
                'rgb(160, 173, 138)',
                'rgb(107, 136, 178)'
                // 'rgb(125, 100, 120)'
            ]
        }]
    }
    return (
        <div>
            <Pie 
                className="pie-chart"
                data={data}
                options={{
                    maintainAspectRatio: true,
                    title: {
                        display: true,
                        text: props.portfolio
                    },
                    // tooltips: {
                    //     callbacks: {
                    //         label: (tooltipItem, data) => {
                    //             const dataset = data.datasets[tooltipItem.datasetIndex];
                    //             const dataPoint = dataset.data[tooltipItem.index];
                    //             const label = data.labels[tooltipItem.index];
                    //             const total = dataset.data.reduce((previousValue, currentValue, currentIndex, array) => {
                    //                 return parseFloat(previousValue) + parseFloat(currentValue);
                    //             });
                    //             const percentage = (dataPoint * 100 / total).toFixed(2);
                    //             // return `${label}: ${dataPoint} (${percentage}%)`;
                    //             return percentage + '%';
                    //         }
                    //     },
                    //     bodyFontSize: 20
                    // },
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
        </div>
        
    )
}

export default CostChart;