import React, { Component } from 'react'
import './ShoppingList.scss'
import { DashboardMenu } from "./components/Dashboard/DashboardMenu"
import { UserBar } from "./components/Dashboard/UserBar"
import { Loader } from "./components/Loader/Loader"
import { ShoppingListBody } from './components/ShoppingList/ShoppingListBody'

export class ShoppingList extends Component {

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
                items: data.items,
                deletedItems: data.deletedItems
            })
        })
    }

    render() {
        return (
            <div className="shopping-list-wrapper">
                <Loader onRef={ref => (this.loader = ref)}></Loader>
                <UserBar avatar={this.state.avatar} email={this.state.email} userName={this.state.userName}></UserBar>
                <DashboardMenu></DashboardMenu>
                <ShoppingListBody items={this.state.items} deletedItems={this.state.deletedItems}></ShoppingListBody>
            </div>
        )
    }
}
