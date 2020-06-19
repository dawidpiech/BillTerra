import React, { Component } from 'react'
import { Container, Row, Col, Nav } from 'reactstrap'
import { Router, NavLink, Route } from "react-router-dom"
import { DashboardMenu } from "./components/DashboardMenu"
import { DashboardBody } from "./components/DashboardBody"
import "./Dashboard.scss"
import { UserBar } from "./components/UserBar"

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };
    }


    render() {
        return (
            <div className="dashboard_wrapper">
                <UserBar></UserBar>
                <DashboardMenu></DashboardMenu>
                <DashboardBody></DashboardBody>
            </div>
        )
    }
}
