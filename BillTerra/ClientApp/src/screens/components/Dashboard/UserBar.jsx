import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import './UserBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHome, faCreditCard, faPiggyBank, faClipboardList } from '@fortawesome/free-solid-svg-icons'


export class UserBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };
    }


    clickAvatar() {
        let avatar = document.querySelector(".userMenu")
        avatar.classList.toggle("active")
        avatar.classList.toggle("inactive")
    }


    render() {
        return (
            <div className="dashboard_userbar_container">
                <div className="logo">
                    <NavLink to="/dashboard">Bill<span>Terra</span></NavLink>
                </div>
                <div className="userAvatar" onClick={this.clickAvatar}>
                    <img src="https://techforum.wpcdn.pl/original/3X/8/e/8e616c62c78783aef2b1ea8e44d25f825f08bee5.jpeg" alt="Avatar" />
                </div>

                <div className="userMenu inactive">
                    <img src="https://techforum.wpcdn.pl/original/3X/8/e/8e616c62c78783aef2b1ea8e44d25f825f08bee5.jpeg" alt="Avatar" />
                    <p>asdffasdf@fsadfsda.pl</p>
                    <NavLink to="/login">Wyloguj</NavLink>
                </div>
            </div>
        )
    }
}
