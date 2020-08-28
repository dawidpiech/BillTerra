import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export class PieChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {
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

            colors: this.props.colors,  //['#012DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
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
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        )
    }
}