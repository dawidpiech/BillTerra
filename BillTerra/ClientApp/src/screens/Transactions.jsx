import React, { Component } from 'react';
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

    componentWillMount() {
        this.init()
    }

    init() {
        fetch('/Transaction/Index', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            return result.json()
        }).then(data => {
            this.setState({
                avatar: data.avatar,
                email: data.email,
                userName: data.userName,
                expensesCategory: data.expensesCategory,
                incomesCategory: data.incomeCategory,
                transactions: data.transactions
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
                <TransactionsBody expensesCategory={this.state.expensesCategory} incomesCategory={this.state.incomesCategory} transactions={this.state.transactions}></TransactionsBody>
            </div>
        )
    }
}
