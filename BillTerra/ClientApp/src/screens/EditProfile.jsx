import React, { Component } from 'react'
import './EditProfile.scss'
import { DashboardMenu } from "./components/Dashboard/DashboardMenu"
import { UserBar } from "./components/Dashboard/UserBar"
import { Loader } from "./components/Loader/Loader"
import { EditProfileBody } from './components/EditProfile/EditProfileBody'

export class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.changeAvatar = this.changeAvatar.bind(this)
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
                userName: data.userName
            })
        })
    }

    changeAvatar(a, b) {
        this.setState({
            avatar: a,
            userName: b
        })
    }



    render() {
        return (
            <div className="reports-wrapper">
                <Loader onRef={ref => (this.loader = ref)}></Loader>
                <UserBar avatar={this.state.avatar} email={this.state.email} userName={this.state.userName}></UserBar>
                <DashboardMenu></DashboardMenu>
                <EditProfileBody nick={this.state.userName} changeAvatar={this.changeAvatar}></EditProfileBody>
            </div>
        )
    }
}
