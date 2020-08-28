import React, { Component } from "react"
import { NavLink, Router } from "react-router-dom"
import { Container, Row, Col } from 'reactstrap'
import "./DashboardBody.scss"
import { PieChart } from "../Charts/PieCharts"

export class DashboardBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        const colors = ['#012DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
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



        return (
            <div className="dashboard_body_container">
                <Container>
                    <Row>
                        <Col>
                            <b>POWIADOMIENIA</b>
                            <br></br>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dignissimos dolore a ducimus nulla, iste velit aut itaque neque accusamus laudantium, fugit reprehenderit corrupti officiis sed illum. Reiciendis, ullam harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga labore tenetur, debitis, optio sequi porro similique corporis, a et eos repellat! Autem ab labore, rerum corrupti quidem tempore libero eaque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, officia. At atque et, error quod hic perferendis expedita facilis molestias ut quaerat, minima culpa nulla voluptatem iste soluta quibusdam voluptas.
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            <PieChart title="TIEL AFD DS FDS" data={data} colors={colors}></PieChart>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
