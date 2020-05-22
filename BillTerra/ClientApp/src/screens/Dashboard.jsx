import React, { Component } from 'react';
import { Container, Row, Col, Nav } from 'reactstrap';
import { Router, NavLink, Route } from "react-router-dom";
import './Dashboard.scss';

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            username: localStorage.getItem('username') ? (localStorage.getItem('username')) : (''),
            token: localStorage.getItem('token') ? (localStorage.getItem('token')) : ('')
        };
    }


    render() {
        return (
            <h1>DASHBOARD</h1>
        );
    }
}
