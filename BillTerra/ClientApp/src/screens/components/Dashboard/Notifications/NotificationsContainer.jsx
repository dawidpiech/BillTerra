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
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
                arr.splice(i, 1)
            }
        }
        this.setState({
            visibleNotyfications: arr
        })

        this.deleteNotyficationFromDatabase(id);
    }

    deleteNotyficationFromDatabase(id) {
        fetch('/Databoard/DeleteNotyfication', {
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
