import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export class LineCharts extends Component {

    constructor(props) {
        super(props)
    }




    render() {
        const date = new Date()
        const options = {
            title: {
                text: 'Expenses and Incomes for the current month'
            },

            yAxis: {
                title: {
                    text: 'Values'
                }
            },

            colors: this.props.colors,

            xAxis: {
                type: 'datetime',
                labels: {
                    format: '{value:%Y-%m-%d}',
                    rotation: 45,
                    align: 'left'
                }
            },

            credits: {
                enabled: false
            },

            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Expenses',
                data: this.props.data[0].data,
                pointStart: Date.UTC(date.getFullYear(), date.getMonth(), 1),
                pointInterval: 24 * 36e5
            }, {
                name: 'Incomes',
                data: this.props.data[1].data,
                pointStart: Date.UTC(date.getFullYear(), date.getMonth(), 1),
                pointInterval: 24 * 36e5
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }
        if (typeof this.props.data !== "undefined") {
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
}

