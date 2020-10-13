import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from "react-router-dom";
import './Home.scss';
import { Loader } from "./components/Loader/Loader"

export class Home extends Component {
  static displayName = Home.name;


  componentDidMount() {
    this.loader.hideLoader()
  }

  render() {
    return (
      <div className="wrapper">
        <Loader onRef={(ref) => this.loader = ref}></Loader>
        <header>
          <div className="logo">
            Bill<span>Terra</span>
          </div>
          <div className="buttons-container">
            <NavLink to="/login">SignIn</NavLink>
            <NavLink to="/registration">SignUp</NavLink>
          </div>
        </header>
        <main>
          <Container>
            <Row>
              <Col className="text-center">
                <div className="welcome">
                  <h1>Welcome!</h1>
                  <h2>
                    Stop worrying about your finances
                </h2>
                  <h4 style={{ fontWeight: "lighter" }}>
                    Expense tracker that works anywhere, any time
                </h4>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
        <footer>
          <div className="text-center">
            Copyright © 2020 BillTera
          </div>
        </footer>
      </div>
    );
  }
}
