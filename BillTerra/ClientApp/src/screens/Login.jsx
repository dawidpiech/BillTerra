import React, { Component } from 'react'
import { Alert, Form, Label, Input, FormGroup, Button, FormFeedback } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import './Login.scss'
import { Loader } from "./components/Loader/Loader"


export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isAuthenticated: false,
            error: false,
            errorMessage: "Error",
            emailValid: false,
            passwordValid: false,
            buttonDisabled: true
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    componentDidMount() {
        this.loader.hideLoader()
    }


    handleChange(e, param) {
        e.preventDefault()
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
        this.setState({ [param]: e.target.value })


        setTimeout(() => {
            this.setState({ emailValid: expression.test(String(this.state.email)) })
            this.setState({ passwordValid: (this.state.password.length > 0) ? true : false })
            this.setState({ buttonDisabled: (this.state.passwordValid && this.state.emailValid) ? false : true })
        }, 100);

    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            Email: this.state.email,
            Password: this.state.password
        }
        this.setState({ buttonDisabled: true })
        if (this.state.email.length > 0 && this.state.password.length > 0) {
            fetch('/Account/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(result => {
                return result.json()
            }).then(data => {
                if (data.loginAccountSucceeded) {
                    this.setState({
                        email: "",
                        password: "",
                        isAuthenticated: true,
                        error: false,
                        errorMessage: "",
                        emailValid: false,
                        passwordValid: false,
                        buttonDisabled: true
                    })
                }
                else {
                    this.setState({
                        email: "",
                        password: "",
                        isAuthenticated: false,
                        error: true,
                        errorMessage: data.error,
                        emailValid: false,
                        passwordValid: false,
                        buttonDisabled: true
                    })
                }


            }).catch(error => {
                this.setState({
                    email: "",
                    password: "",
                    isAuthenticated: false,
                    error: true,
                    errorMessage: "Something went wrong, please try again later",
                    emailValid: false,
                    passwordValid: false,
                    buttonDisabled: true
                })

            })
        }
    }


    render() {
        if (this.state.isAuthenticated) {
            return (
                <Redirect to={{ pathname: "/dashboard" }}></Redirect>
            )
        }
        else {
            return (
                <div className="wrapper-login">
                    <Loader onRef={(ref) => this.loader = ref}></Loader>
                    <header>
                        <div className="logo">
                            <Link to="/">Bill<span>Terra</span></Link>
                        </div>
                    </header>
                    <main>
                        <div className="authorization">
                            <p className="authorization__title">Login</p>
                            <p className="authorization__register">
                                New on BillTerra? <span><Link to="/registration"> Create an account</Link></span>
                            </p>
                            {
                                this.state.error ? <Alert color="danger" isOpen={"visible"}>{this.state.errorMessage}</Alert> : ""
                            }
                            <br></br>
                            <Form className="authorization__form" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label className="authorization__label">E-mail</Label>
                                    <Input invalid={!this.state.emailValid && this.state.email.length > 0} onChange={(e) => this.handleChange(e, 'email')} type="e-mail" name="email" value={this.state.email} className="authorization__input" placeholder="Enter e-mail" />
                                    <FormFeedback>Ten e-mail jest niepoprawny!</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="authorization__label">Password <span><Link to="/">Forgot password?</Link></span></Label>
                                    <Input onChange={(e) => this.handleChange(e, 'password')} type="password" name="password" className="authorization__input" placeholder="Enter password" value={this.state.password}></Input>
                                    <FormFeedback>To pole nie może być puste!</FormFeedback>
                                </FormGroup>
                                <Button className="authorization__button" disabled={this.state.buttonDisabled}>Login</Button>
                            </Form>
                        </div>
                    </main>
                    <footer>
                        <div className="text-center">
                            Copyright © 2020 BillTera
                        </div>
                    </footer>
                </div>
            )
        }
    }

}