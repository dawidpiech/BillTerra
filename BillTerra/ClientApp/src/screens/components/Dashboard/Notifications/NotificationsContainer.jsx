import React, { Component } from 'react'
import "./NotificationsContainer.scss"
import { NotificationsItem } from './NotificationsItem'

export class NotificationsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visibleNotyfications: []
        }

        this.deleteNotification = this.deleteNotification.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visibleNotyfications: nextProps.notyfications
        })
    }

    deleteNotification(id) {
        let arr = this.state.visibleNotyfications;
        let idInArray
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
                idInArray = i
            }
        }

        let notyfication = {
            ID: this.state.visibleNotyfications[idInArray].id,
            Title: this.state.visibleNotyfications[idInArray].title,
            Describe: this.state.visibleNotyfications[idInArray].describe,
            Image: this.state.visibleNotyfications[idInArray].image
        }

        this.deleteNotyficationFromDatabase(notyfication, idInArray)

        this.setState({
            visibleNotyfications: this.state.visibleNotyfications.splice(idInArray, 1)
        })
    }

    deleteNotyficationFromDatabase(id, idInArray) {
        fetch('/Notyfication/EnableNotyfication', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        })
    }


    render() {
        if (this.state.visibleNotyfications.length < 1) {
            return (
                <div className="notifications-container">
                    <h1>Currently you haven't any notifications</h1>
                </div>
            )
        }
        else {
            return (
                <div className="notifications-container">
                    {this.state.visibleNotyfications.map((d) => <NotificationsItem title={d.title} content={d.describe} avatar={d.image} id={d.id} deleteNotificationFromState={this.deleteNotification}></NotificationsItem>)}
                </div>
            )
        }
    }
}
