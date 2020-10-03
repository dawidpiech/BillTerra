import React, { Component } from "react"
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
        const colors = ['#012000', '#aaa432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
        const data = [
            { name: "Income", y: 23 },
            { name: "asdf", y: 45 },
            { name: "Incafsdfome", y: 12 },
            { name: "Incoasfdasdfasdfasdme", y: 20 }
        ]

        return (


            <div className="dashboard_body_container">
                <Container>
                    <Row>
                        <Col>
                            <div className="notifications-title">NOTIFICATIONS</div>
                            <NotificationsContainer notyfications={this.props.notyfications}></NotificationsContainer>
                        </Col>
                    </Row>
                    <Row style={{ padding: "30px 0" }}>
                        <Col sm={12} md={4}>
                            <FinanceBlock name="Balance" backgroundColor="#12CEAD" value={this.props.finance.balance} fontColor="#ffffff"></FinanceBlock>
                        </Col>
                        <Col sm={12} md={4}>
                            <FinanceBlock name="Spendings" backgroundColor="#000000" value={this.props.finance.spendings} fontColor="#ffffff"></FinanceBlock>
                        </Col>
                        <Col sm={12} md={4}>
                            <FinanceBlock name="Incomes" backgroundColor="#707070" value={this.props.finance.incomes} fontColor="#ffffff"></FinanceBlock>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ height: "400px", background: "#aaaaaa" }} sm={12} lg={6}>
                            <PieChart title={"Chart of your incomes"} data={data} colors={colors}></PieChart>
                            <h1>TUTAJ BEDZIE WYKRES</h1>
                        </Col>
                        <Col style={{ height: "400px", background: "#444444" }} sm={12} lg={6}>
                            {/* <PieChart title={"Chart of your expenses"} data={this.props.finance.charts.expenses} colors={colors}></PieChart> */}
                            <h1>TUTAJ BEDZIE WYKRES</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
