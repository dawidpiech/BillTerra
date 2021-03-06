import React, { Component } from 'react'
import { Alert, Form, Label, Input, FormGroup, Button, FormFeedback } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'
import './Registration.scss'



export class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            password_confirm: "",
            isAuthenticated: false,
            error: false,
            errorMessage: [],
            emailValid: false,
            nameValid: false,
            passwordValid: false,
            buttonDisabled: true,
            login: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }



    handleChange(e, param) {
        e.preventDefault()
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        this.setState({ [param]: e.target.value })


        setTimeout(() => {
            this.setState({ emailValid: expression.test(String(this.state.email)) })
            this.setState({ nameValid: (this.state.name.length > 0) ? true : false })
            this.setState({ passwordValid: (this.state.password === this.state.password_confirm) ? true : false })
            this.setState({ buttonDisabled: (this.state.passwordValid & this.state.emailValid) ? false : true })
        }, 100);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ buttonDisabled: true })

        let data = {
            Name: this.state.name,
            Email: this.state.email,
            Password: this.state.password
        }

        if (this.state.email.length > 0 && this.state.password.length > 0) {
            fetch('/Account/Create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(result => {
                return result.json()
            }).then(data => {
                if (data.createAccountSucceeded) {
                    this.setState({
                        login: true
                    })
                }
                else {
                    let errorsList = []
                    data.errors.forEach(element => {
                        errorsList.push(element.description)
                    })

                    this.setState({
                        email: "",
                        password: "",
                        name: "",
                        password_confirm: "",
                        isAuthenticated: false,
                        error: true,
                        errorMessage: errorsList,
                        emailValid: false,
                        nameValid: false,
                        passwordValid: false,
                        buttonDisabled: true
                    })
                }
            })
                .catch(error => {
                    console.log(error)
                    this.setState({
                        email: "",
                        password: "",
                        name: "",
                        password_confirm: "",
                        isAuthenticated: false,
                        error: true,
                        errorMessage: ["Something went wrong, please try agin later!"],
                        emailValid: false,
                        nameValid: false,
                        passwordValid: false,
                        buttonDisabled: true
                    })
                })
        }
    }


    render() {
        if (this.state.login) {
            return (
                <Redirect to={{ pathname: "/login" }}></Redirect>
            )
        }

        return (
            <div className="wrapper-register">
                <header>
                    <div className="logo">
                        <Link to="/">Bill<span>Terra</span></Link>
                    </div>
                </header>
                <main>
                    <div className="authorization">
                        <p className="authorization__title">Sign Up</p>
                        <p className="authorization__register">
                            Already have an account? <span><Link to="/login"> Login </Link></span>
                        </p>
                        {
                            this.state.error ? <Alert color="danger" isOpen={"visible"}>{
                                this.state.errorMessage.map(line => (
                                    <p>{line}</p>
                                ))}
                            </Alert> : ""
                        }
                        <br></br>
                        <Form className="authorization__form" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label className="authorization__label">E-mail</Label>
                                <Input invalid={!this.state.emailValid} onChange={(e) => this.handleChange(e, 'email')} type="e-mail" value={this.state.email} name="email" className="authorization__input" placeholder="Enter e-mail" />
                                <FormFeedback>Ten e-mail jest niepoprawny!</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label className="authorization__label">Username</Label>
                                <Input invalid={!this.state.nameValid} onChange={(e) => this.handleChange(e, 'name')} type="e-mail" name="email" value={this.state.name} className="authorization__input" placeholder="Enter username" />
                                <FormFeedback>To pole nie może być puste!</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label className="authorization__label">Password</Label>
                                <Input onChange={(e) => this.handleChange(e, 'password')} type="password" name="password" className="authorization__input" value={this.state.password} placeholder="Enter password" ></Input>
                                <FormFeedback>To pole nie może być puste!</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label className="authorization__label">Password connfirmation</Label>
                                <Input invalid={!this.state.passwordValid && this.state.password_confirm.length > 0} onChange={(e) => this.handleChange(e, 'password_confirm')} value={this.state.password_confirm} type="password" name="password_confirm" className="authorization__input" placeholder="Enter password" ></Input>
                                <FormFeedback>Hasła muszą być takie same!</FormFeedback>
                            </FormGroup>
                            <Button className="authorization__button" disabled={this.state.buttonDisabled}>Sign Up</Button>
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

