import React, { Component } from 'react'
import "./NotificationsContainer.scss"
import { ListGroupItem } from 'reactstrap';
import { NotificationsItem } from './NotificationsItem'

export class NotificationsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            a: props.notyfications
        }

        this.deleteNotification = this.deleteNotification.bind(this)
    }

    deleteNotification(id) {
        let arr = this.state.notifications;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][0] == id) {
                arr.splice(i, 1);
            }
        }
        this.setState({
            a: arr
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
        if (this.state.a.length < 1) {
            return (
                <div className="notifications-container">
                    <h1>Currently you haven't any notifications</h1>
                </div>
            )
        }
        else {
            return (
                <div className="notifications-container">
                    {this.state.a.map((d) => <NotificationsItem title={d.title} content={d.describe} avatar={d.image} id={d.id} deleteNotificationFromState={this.deleteNotification}></NotificationsItem>)}
                </div>
            )
        }
    }
}
