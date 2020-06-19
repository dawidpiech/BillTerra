import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import './DashboardMenu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHome, faCreditCard, faPiggyBank, faClipboardList } from '@fortawesome/free-solid-svg-icons'

export class DashboardMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };
    }


    render() {
        return (
            <div className="dashboard_menu_container">
                <div className="dashboard_menu">
                    <ul>
                        <li className="dashboard_menu_element">
                            <NavLink to="/dashboard">
                                <FontAwesomeIcon icon={faCoffee} />
                                <br />
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="dashboard_menu_element">
                            <NavLink to="/transactions">
                                <FontAwesomeIcon icon={faCreditCard} />
                                <br />
                                Transactions
                            </NavLink>
                        </li>
                        <li className="dashboard_menu_element">
                            <NavLink to="/jars">
                                <FontAwesomeIcon icon={faPiggyBank} />
                                <br />
                                Jars
                            </NavLink>
                        </li>
                        <li className="dashboard_menu_element">
                            <NavLink to="/shoppinglist">
                                <FontAwesomeIcon icon={faClipboardList} />
                                <br />
                                Shopping List
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
