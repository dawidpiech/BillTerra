import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import './DashboardMenu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHome, faCreditCard, faPiggyBank, faClipboardList, faChartBar } from '@fortawesome/free-solid-svg-icons'

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
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="dashboard_menu_element">
                            <NavLink to="/transactions">
                                <FontAwesomeIcon icon={faCreditCard} />
                                Transactions
                            </NavLink>
                        </li>
                        <li className="dashboard_menu_element">
                            <NavLink to="/jars">
                                <FontAwesomeIcon icon={faPiggyBank} />
                                Jars
                            </NavLink>
                        </li>
                        <li className="dashboard_menu_element">
                            <NavLink to="/shopinglist">
                                <FontAwesomeIcon icon={faClipboardList} />
                                <span>Shopping List</span>
                            </NavLink>
                        </li>
                        <li className="dashboard_menu_element">
                            <NavLink to="/reports">
                                <FontAwesomeIcon icon={faChartBar} />
                                <span>Reports</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
