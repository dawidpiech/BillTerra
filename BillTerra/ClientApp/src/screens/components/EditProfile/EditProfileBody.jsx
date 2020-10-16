import React, { Component } from 'react'
import { Container, Row, Col, Button, Input, InputGroup, Label, FormGroup, FormFeedback, Alert, Spinner } from 'reactstrap'
import "./EditProfileBody.scss"

export class EditProfileBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedAvatar: "/img/avatar-1.jpg",
            saveLoad: false,
            changePasswordLoad: false,
            saveResponce: "",
            nick: "",
            changePasswordResponce: "",
            repeatPassword: "",
            newPassword: "",
            oldPassword: ""
        }

        this.changeAvatar = this.changeAvatar.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    changeAvatar(e) {
        this.setState({
            selectedAvatar: e.target.value
        })
    }

    saveChanges() {
        this.setState({
            saveLoad: true
        })

        let data = {
            avatar: this.state.avatar,
            nick: this.state.nick
        }

        fetch('ścieżka', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(result => {
            return result.json()
        }).then(e => {
            this.setState({
                saveResponce: e,
                saveLoad: false
            })
        })
    }


    changePassword() {
        this.setState({
            changePasswordLoad: true
        })

        let password = this.state.newPassword

        fetch('ścieżka', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(password)
        }).then(result => {
            return result.json()
        }).then(e => {
            this.setState({
                changePasswordResponce: e,
                changePasswordLoad: false
            })
        })
    }


    render() {
        let a = this.props.nick
        return (
            <div className="edit-profile-body-wrapper">
                <Container>
                    <Row onChange={this.changeAvatar}>
                        <Col xs={12} className="avatar-title">
                            <span>Select your avatar</span>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-1.jpg" checked></Input>
                                <div className="avatar avatar-1 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-2.jpg"></Input>
                                <div className="avatar avatar-2 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-3.jpg"></Input>
                                <div className="avatar avatar-3 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-4.jpg"></Input>
                                <div className="avatar avatar-4 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-5.jpg"></Input>
                                <div className="avatar avatar-5 active-avatar"></div>
                            </InputGroup>
                        </Col>

                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-6.jpg"></Input>
                                <div className="avatar avatar-6 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-7.jpg"></Input>
                                <div className="avatar avatar-7 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-8.jpg"></Input>
                                <div className="avatar avatar-8 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-9.jpg"></Input>
                                <div className="avatar avatar-9 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-10.jpg"></Input>
                                <div className="avatar avatar-10 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-11.jpg"></Input>
                                <div className="avatar avatar-11 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar-12.jpg"></Input>
                                <div className="avatar avatar-12 active-avatar"></div>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="change-nickname-wrapper">
                        <Label>Change your nickname</Label>
                        <Input type="text" onChange={e => this.setState({ nick: e.target.value })} placeholder="Enter your new name"></Input>

                        <Button onClick={this.saveChanges} className="save-button">
                            Save changes
                            <br></br>
                            {(this.state.saveLoad) ?
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                : ""
                            }
                            <span className="edit-categories-responce">{this.state.saveResponce}</span>
                        </Button>
                    </Row>
                    <Row>
                        <Col xs={12} className="avatar-title">
                            <span>Change password</span>
                            {(this.state.changePasswordResponce !== "") ? <Alert color="danger" isOpen={"visible"}>{this.state.changePasswordResponce}</Alert> : ""}
                        </Col>
                        <Col className="change-password-form">
                            <FormGroup>
                                <Label>Current password</Label>
                                <Input type="password" name="old-password" onChange={e => this.setState({ oldPassword: e.target.value })} placeholder="Enter your current password"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>New password</Label>
                                <Input type="password" name="new-password" onChange={e => this.setState({ newPassword: e.target.value })} invalid={this.state.newPassword !== this.state.repeatPassword} placeholder="Enter your new password"></Input>
                                <FormFeedback>The passwords must be exactly the same!</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Repeat password</Label>
                                <Input type="password" name="repeat-password" onChange={e => this.setState({ repeatPassword: e.target.value })} invalid={this.state.newPassword !== this.state.repeatPassword} placeholder="Repeat your new password"></Input>
                                <FormFeedback>The passwords must be exactly the same!</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Button className="submit-change-password" disabled={this.state.newPassword !== this.state.repeatPassword} onClick={this.changePassword}>
                            Change password
                            <br></br>
                            {(this.state.changePasswordLoad) ?
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                : ""
                            }
                        </Button>
                    </Row>
                </Container>
            </div >
        )
    }
}