import React, { Component } from 'react'
import "./NotificationsContainer.scss"
import { ListGroupItem } from 'reactstrap';
import { NotificationsItem } from './NotificationsItem'


// let transactions = [
//     ["nazwa transakcji", "Jakiś komentarz do transakcji", data, 1000, 1],
//     ["nazwa transakcji", "Jakiś komentarz do transakcji", data, 354, 1],
//     ["nazwa transakcji", "Jakiś komentarz do transakcji", data, 234124, 1],
//     ["nazwa transakcji", "Jakiś komentarz do transakcji", data, 2341, 1],
//     ["nazwa transakcji", "Jakiś komentarz do transakcji", data, 789, 1],
//     ["nazwa transakcji", "Jakiś komentarz do transakcji", data, 34543, 1],
//     ["nazwa transakcji", "Jakiś komentarz do transakcji", data, 1234, 1],
//     ["nazwa transakcji", "Jakiś komentarz do transakcji", data, 1012300, 1],
//     ["nazwa transakcji", "Jakiś komentarz do transakcji", data, 213, 1]
// ]

export class NotificationsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notifications: [
                [1, "Jakieś powiadomienie nume 1 asdf asdfsdafsdaf sadfsda sad fasd fsad fsafsd afsadf asdf asdfj asdf asdjfk sdf kljsdak fjlsdakjl fhasdkj sjklda fkjlsadklfj sakjlfklasdklj fasdj", "Avatar"],
                [2, "Jakieś powiadomienie numero 2", "Avatar"],
                [3, "Lorem asdf asdf asdf sadf sdf sdf sdafsad fsadf sda", "Avatar"]
            ]
        };

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
            notifications: arr
        })

        this.deleteNotyficationFromDatabase(id);
    }

    deleteNotyficationFromDatabase(id) {
        //tutaj dopisać usuwanie powiadomienia z bazy danych
    }



    render() {

        if (this.state.notifications.length < 1) {
            return (
                <div className="notifications-container">
                    <h1>Currently you haven't any notifications</h1>
                </div>
            )
        }
        else {
            return (
                <div className="notifications-container">
                    {this.state.notifications.map((d) => <NotificationsItem content={d[1]} avatar={d[2]} id={d[0]} deleteNotificationFromState={this.deleteNotification}></NotificationsItem>)}
                </div>
            )
        }
    }
}
