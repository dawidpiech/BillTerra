import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


export class PieChart extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        const options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                margin: 40,
                height: 100 + "%"
            },
            title: {
                margin: 0,
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
                name: 'Value',
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

