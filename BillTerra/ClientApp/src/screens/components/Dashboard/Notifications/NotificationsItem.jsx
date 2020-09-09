import React, { Component } from 'react'
import "./NotificationsItem.scss"


export class NotificationsItem extends Component {

    constructor(props) {
        super(props)

    }

    deleteNotification(e, id) {
        this.props.deleteNotificationFromState(id);
    }

    render() {
        return (
            <div className="notyfication-wrap" id={this.props.id}>
                <div className={`notification-avatar avatar-${this.props.avatar}`}></div>
                <div className="notification-content">{this.props.content}</div>
                <div className="notification-close" onClick={(e) => this.deleteNotification(e.target, this.props.id)}></div>
            </div>
        )
    }
}
