import React, { Component } from 'react'
import { Container, Row, Col, Nav } from 'reactstrap'
import { Router, NavLink, Route } from "react-router-dom"
import { DashboardMenu } from "./components/Dashboard/DashboardMenu"
import { DashboardBody } from "./components/Dashboard/DashboardBody"
import "./Dashboard.scss"
import { UserBar } from "./components/Dashboard/UserBar"
import { Loader } from "./components/Loader/Loader"





export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };
    }

    componentDidMount() {
        this.loader.hideLoader()
    }

    render() {
        return (
            <div className="dashboard_wrapper">
                <Loader onRef={ref => (this.loader = ref)}></Loader>
                <UserBar></UserBar>
                <DashboardMenu></DashboardMenu>
                <DashboardBody></DashboardBody>
            </div>
        )
    }
}
