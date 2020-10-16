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
        fetch('/ShoppingList/Index', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            return result.json()
        }).then(data => {
            this.setState({
                avatar: data.avatar,
                email: data.email,
                userName: data.userName,

            })
        })
    }

    render() {

        let data = [{
            name: "Expenses",
            data: [
                1223,
                1000,
                1223,
                1111,
                111,
                111,
                899,
                1211,
                1234,
                2323,
                2131,
                1222,
                2223,
                2341,
                1111,
                1223,
                1000,
                1223,
                1111,
                111,
                111,
                899,
                1211,
                1234,
                2323,
                2131,
                1222,
                2223,
                2341,
                1111
            ]
        },
        {
            name: "Incomes",
            data: [
                1223,
                1000,
                1223,
                1111,
                111,
                111,
                899,
                1211,
                1234,
                2323,
                2131,
                1222,
                2223,
                2341,
                1111,
                1223,
                1000,
                1223,
                1111,
                111,
                111,
                899,
                1211,
                1234,
                2323,
                2131,
                1222,
                2223,
                2341,
                1111
            ].reverse()
        }
        ]

        let jars = [
            { goal: 1000, currentAmount: 412, title: "Jars 1" },
            { goal: 12000, currentAmount: 412, title: "Jars 2" },
            { goal: 1000, currentAmount: 982, title: "Jars 3" },
            { goal: 1000, currentAmount: 412, title: "Jars 1" },
            { goal: 12000, currentAmount: 412, title: "Jars 2" },
            { goal: 1000, currentAmount: 982, title: "Jars 3" }
        ]
        return (
            <div className="reports-wrapper">
                <Loader onRef={ref => (this.loader = ref)}></Loader>
                <UserBar avatar={this.state.avatar} email={this.state.email} userName={this.state.userName}></UserBar>
                <DashboardMenu></DashboardMenu>
                <ReportsBody data={data} jars={jars}></ReportsBody>
            </div>
        )
    }
}
