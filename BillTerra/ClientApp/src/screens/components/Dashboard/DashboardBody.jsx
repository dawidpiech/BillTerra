import React, { Component } from "react"
import { NavLink, Router } from "react-router-dom"
import { Container, Row, Col } from 'reactstrap'
import "./DashboardBody.scss"
import { PieChart } from "../Charts/PieCharts"
import { NotificationsContainer } from "./Notifications/NotificationsContainer"
import { FinanceBlock } from "./FinanceBlock/FinanceBlock"


import Highcharts, { find } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export class DashboardBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {

        //poniższe zmienne są do wykresu
        const colors = ['#012DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
        const title = "sdfdsafsdf"
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
                            <div className="notifications-title">NOTIFICATIONS</div>
                            <NotificationsContainer></NotificationsContainer>
                        </Col>
                    </Row>
                    <Row style={{ padding: "30px 0" }}>
                        <Col sm={12} md={4}>
                            <FinanceBlock name="Balance" backgroundColor="#12CEAD" value="1000" fontColor="#ffffff"></FinanceBlock>
                        </Col>
                        <Col sm={12} md={4}>
                            <FinanceBlock name="Spendings" backgroundColor="#000000" value="1000" fontColor="#ffffff"></FinanceBlock>
                        </Col>
                        <Col sm={12} md={4}>
                            <FinanceBlock name="Income" backgroundColor="#707070" value="1000" fontColor="#ffffff"></FinanceBlock>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ height: "400px", background: "#aaaaaa" }} sm={12} lg={6}>
                            {/* <PieChart title={title} data={data} colors={colors}></PieChart>  nie wiem o co chodzi to generuje błąd */}
                            <h1>TUTAJ BEDZIE WYKRES</h1>
                        </Col>
                        <Col style={{ height: "400px", background: "#444444" }} sm={12} lg={6}>
                            {/* <PieChart title={title} data={data} colors={colors}></PieChart> */}  {/* nie wiem o co chodzi to generuje błąd*/}
                            <h1>TUTAJ BEDZIE WYKRES</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
