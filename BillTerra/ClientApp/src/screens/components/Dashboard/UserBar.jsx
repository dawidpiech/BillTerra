import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { Button } from 'reactstrap';
import './UserBar.scss'


export class UserBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };

        this.wrapperRef = React.createRef()
        this.handleClickOutsideAvatar = this.handleClickOutsideAvatar.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideAvatar);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutsideAvatar);
    }

    handleClickOutsideAvatar(event) {
        let avatar = document.querySelector(".user-avatar")
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && !avatar.contains(event.target)) {
            let avatarHandler = document.querySelector(".user-menu")
            avatarHandler.classList.add("inactive")
            avatarHandler.classList.remove("active")
        }
    }


    clickAvatar() {
        let avatarHandler = document.querySelector(".user-menu")
        avatarHandler.classList.toggle("active")
        avatarHandler.classList.toggle("inactive")
    }

    logout() {
        fetch('/Account/Logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
    }


    render() {
        return (
            <div className="dashboard-userbar-container">
                <div className="logo">
                    <NavLink to="/dashboard">Bill<span>Terra</span></NavLink>
                </div>
                <div className="user-name">Hi, {this.props.userName}</div>
                <div className="user-avatar" onClick={this.clickAvatar}>
                    <img src={this.props.avatar} alt="Avatar" />
                </div>

                <div ref={this.wrapperRef} className="user-menu inactive">
                    <img src={this.props.avatar} alt="Avatar" />
                    <p>{this.props.email}</p>
                    <NavLink to="/editCategories" className="edit-categories">Edit Categories</NavLink>
                    <NavLink to="/login" onClick={this.logout}>Wyloguj</NavLink>
                </div>
            </div>
        )
    }
}
