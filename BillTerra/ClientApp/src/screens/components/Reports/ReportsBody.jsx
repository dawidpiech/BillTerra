import React, { Component } from 'react'
import { Container, Row, Col, Button, Input } from 'reactstrap'
import { LineCharts } from '../Charts/LineCharts'
import "./ReportsBody.scss"
import { PieChart } from './../Charts/PieCharts'

export class ReportsBody extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const colors = ['#6146E8', '#FF5959', '#ED561B', '#E8B646', '#84FF4D', '#12CEAD', '#FF9655', '#FFF263', '#6AF9C4'].reverse()
        return (
            <div className="reports-body-wrapper">
                <Container>
                    <Row>

                        {(typeof this.props.jars !== "undefined") ? this.props.jars.map((e, id) =>
                            <Col xs={12} md={4}>
                                <PieChart title={e.title} data={[{ name: "Collected: ", y: (e.currentAmount / e.goal * 100) }, { name: "Missing part: ", y: ((e.goal - e.currentAmount) / e.goal * 100) }]} colors={colors}></PieChart>
                            </Col>
                        ) : ""}
                        <Col xs={12}>
                            <LineCharts data={this.props.data} title="Expenses for the current month" colors={colors}></LineCharts>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}