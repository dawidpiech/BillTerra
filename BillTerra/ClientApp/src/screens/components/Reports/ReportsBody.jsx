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
        const colors = ['#C5FA89', '#FACD5F', '#78E2FA', '#FAA491', '#84A7FA', '#6BFAC5', '#6AF9C4', '#FA84B1', '#FAF17C'].reverse()
        return (
            <div className="reports-body-wrapper">
                <Container>
                    <Row>

                        {(typeof this.props.jars !== "undefined") ? this.props.jars.filter(e => { return e.state === 2 }).map((e, id) =>
                            <Col xs={12} md={4}>
                                <PieChart title={e.name} data={[{ name: "Collected: ", y: (e.currentAmount / e.goal * 100) }, { name: "Missing part: ", y: ((e.goal - e.currentAmount) / e.goal * 100) }]} colors={[colors[id], colors[id + 1]]}></PieChart>
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