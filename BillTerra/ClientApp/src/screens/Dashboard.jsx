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
            avatar: "",
            email: "",
            finance: "",
            notyfication: "",
            userName: ""
        };
    }

    componentWillReceiveProps() {
        this.init()
    }

    init() {
        fetch('/Databoard/Index', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            return result.json()
        }).then(data => {
            console.log(data)
            this.setState({
                avatar: data.avatar,
                email: data.email,
                finance: data.finance,
                notyfication: data.notyfication,
                userName: data.userName
            })
        })
    }

    componentDidMount() {
        this.loader.hideLoader()
    }

    render() {
        return (
            <div className="dashboard_wrapper">
                <Loader onRef={ref => (this.loader = ref)}></Loader>
                <UserBar avatar={this.state.avatar} email={this.state.email} userName={this.state.userName}></UserBar>
                <DashboardMenu></DashboardMenu>
                <DashboardBody finance={this.state.finance} notyfications={this.state.notyfication} ></DashboardBody>
            </div>
        )
    }
}
