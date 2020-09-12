import React, { Component } from 'react';
import { Container, Row, Col, Nav } from 'reactstrap';
import { Router, NavLink, Route } from "react-router-dom";
import './Transactions.scss';
import { DashboardMenu } from "./components/Dashboard/DashboardMenu"
import { TransactionsBody } from "./components/Transactions/TransactionsBody"
import "./Dashboard.scss"
import { UserBar } from "./components/Dashboard/UserBar"
import { Loader } from "./components/Loader/Loader"

export class Transactions extends Component {

    constructor(props) {
        super(props);
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
                <TransactionsBody></TransactionsBody>
            </div>
        )
    }
}
