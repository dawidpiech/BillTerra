import React, { Component } from 'react'
import { DashboardMenu } from "./components/Dashboard/DashboardMenu"
import "./EditCategories.scss"
import { UserBar } from "./components/Dashboard/UserBar"
import { Loader } from "./components/Loader/Loader"
import { EditCategoriesBody } from './components/EditCategories/EditCategoriesBody'





export class EditCategories extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.loader.hideLoader()
    }

    componentWillMount() {
        this.init()
    }

    init() {
        fetch('/Categorie/Index', {
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
                categories: data.categories
            })
        })
    }

    render() {
        return (
            <div className="edit-categories-wrapper">
                <Loader onRef={ref => (this.loader = ref)}></Loader>
                <UserBar avatar={this.state.avatar} email={this.state.email} userName={this.state.userName}></UserBar>
                <DashboardMenu></DashboardMenu>
                <EditCategoriesBody categories={this.state.categories}></EditCategoriesBody>
            </div>
        )
    }
}