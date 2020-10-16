import React, { Component } from 'react'
import './Jars.scss'
import { DashboardMenu } from "./components/Dashboard/DashboardMenu"
import { UserBar } from "./components/Dashboard/UserBar"
import { Loader } from "./components/Loader/Loader"
import { JarsBody } from './components/Jars/JarsBody'

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

    balance = 1000000

    init() {
        fetch('/Jar/Index', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(result => {
            return result.json()
        }).then(data => {
            console.log(data)
            this.setState({
                avatar: data.avatar,
                email: data.email,
                userName: data.userName,
                jars: data.jarList,
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
