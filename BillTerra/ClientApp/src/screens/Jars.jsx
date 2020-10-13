import React, { Component } from 'react';
import './Jars.scss';
import { DashboardMenu } from "./components/Dashboard/DashboardMenu"
import { UserBar } from "./components/Dashboard/UserBar"
import { Loader } from "./components/Loader/Loader"
import { JarsBody } from './components/Jars/JarsBody';

export class Jars extends Component {

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


    jars = [
        { id: 1, name: "NAZWA SŁOIKA 1", goal: 10000, currentAmount: 10000, state: "achived" },
        { id: 2, name: "NAZWA SŁOIKA 2", goal: 3000, currentAmount: 2020, state: "in progress" },
        { id: 3, name: "NAZWA SŁOIKA 3", goal: 220000, currentAmount: 3010, state: "in progress" },
        { id: 4, name: "NAZWA SŁOIKA 4", goal: 412423, currentAmount: 6230, state: "in progress" },
        { id: 5, name: "NAZWA SŁOIKA 5", goal: 16650, currentAmount: 8340, state: "in progress" },
        { id: 6, name: "NAZWA SŁOIKA 6", goal: 13430, currentAmount: 1050, state: "not achived" }
    ]

    balance = 1000000

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
                jars: this.jars, //data.jars,
                balance: this.balance //data.balance
            })
        })
    }

    render() {
        return (
            <div className="jars-wrapper">
                <Loader onRef={ref => (this.loader = ref)}></Loader>
                <UserBar avatar={this.state.avatar} email={this.state.email} userName={this.state.userName}></UserBar>
                <DashboardMenu></DashboardMenu>
                <JarsBody jars={this.state.jars} balance={this.state.balance}></JarsBody>
            </div>
        )
    }
}
