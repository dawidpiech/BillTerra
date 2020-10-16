import React, { Component } from 'react'
import './Reports.scss'
import { DashboardMenu } from "./components/Dashboard/DashboardMenu"
import { UserBar } from "./components/Dashboard/UserBar"
import { Loader } from "./components/Loader/Loader"
import { ReportsBody } from './components/Reports/ReportsBody'

export class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.loader.hideLoader()
    }

    componentWillMount() {
        this.init()
    }

    init() {
        fetch('/Raport/Index', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            return result.json()
        }).then(data => {
            this.setState({
                avatar: data.avatar,
                email: data.email,
                userName: data.userName,
                jars: data.jarRaports,
                expenses: data.dayExpenses,
                incomes: data.dayIncome
            })
        })
    }

    render() {

        let data = [{
            name: "Expenses",
            data: this.state.expenses
        },
        {
            name: "Incomes",
            data: this.state.incomes
        }
        ]
        return (
            <div className="reports-wrapper">
                <Loader onRef={ref => (this.loader = ref)}></Loader>
                <UserBar avatar={this.state.avatar} email={this.state.email} userName={this.state.userName}></UserBar>
                <DashboardMenu></DashboardMenu>
                <ReportsBody data={data} jars={this.state.jars}></ReportsBody>
            </div>
        )
    }
}
