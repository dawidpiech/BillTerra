import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export class PieChart extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const data = [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Other',
            y: 7.05
        }]

        const options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: this.props.title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },

            colors: this.props.colors,
            plotOptions: {
                center: [100, 100],
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: this.props.data
            }],
            exporting: {
                enabled: false
            },

            credits: {
                enabled: false
            }
        }

        return (
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        )
    }
}

