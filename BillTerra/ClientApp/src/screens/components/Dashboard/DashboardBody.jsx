import React, { Component } from "react"
import { Container, Row, Col } from 'reactstrap'
import "./DashboardBody.scss"
import { PieChart } from "../Charts/PieCharts"
import { NotificationsContainer } from "./Notifications/NotificationsContainer"
import { FinanceBlock } from "./FinanceBlock/FinanceBlock"
import { color } from "highcharts"

export class DashboardBody extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const colors = ['#6146E8', '#FF5959', '#ED561B', '#E8B646', '#84FF4D', '#12CEAD', '#FF9655', '#FFF263', '#6AF9C4'].reverse()
        const colors2 = [...colors].reverse()
        return (


            < div className="dashboard_body_container" >
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
                        <Col sm={12} lg={6}>
                            <PieChart title={"Chart of your incomes"} data={(typeof this.props.finance.charts !== "undefined") ? this.props.finance.charts.incomes : ""} colors={colors}></PieChart>
                        </Col>
                        <Col sm={12} lg={6}>
                            <PieChart title={"Chart of your expenses"} data={(typeof this.props.finance.charts !== "undefined") ? this.props.finance.charts.expenses : ""} colors={colors2}></PieChart>
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}
