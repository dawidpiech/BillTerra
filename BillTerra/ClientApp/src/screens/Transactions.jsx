import React, { Component } from 'react';
import { Container, Row, Col, Nav } from 'reactstrap';
import { Router, NavLink, Route } from "react-router-dom";
import './Transactions.scss';

export class Transactions extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <div className="dashboard_menu_container">
                <div className="dashboard_menu">
                    <ul>
                        <li className="dashboard_menu_element">
                            <a href=""></a>
                        </li>
                        <li className="dashboard_menu_element">

                        </li>
                        <li className="dashboard_menu_element">

                        </li>
                        <li className="dashboard_menu_element">

                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
