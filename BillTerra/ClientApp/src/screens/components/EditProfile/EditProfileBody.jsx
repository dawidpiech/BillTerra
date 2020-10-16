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
            saveResponce: [],
            nick: "",
            changePasswordResponce: [],
            repeatPassword: "",
            newPassword: "",
            oldPassword: "",
            changePasswordFlag: true
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
            AvatarLink: this.state.selectedAvatar,
            Name: (this.state.nick === "") ? this.props.nick : this.state.nick
        }

        fetch('/Account/EditUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(result => {
            return result.json()
        }).then(e => {
            setTimeout(() => {
                if (e.succeed) {

                    this.props.changeAvatar(data.AvatarLink, data.Name)

                    this.setState({
                        saveResponce: "All your changes have been saved!",
                        saveLoad: false
                    })
                }
                else {
                    this.setState({
                        saveResponce: "Something went wrong please try again later.",
                        saveLoad: false
                    })
                }
            }, 500)

            setTimeout(() => {
                this.setState({
                    saveResponce: ""
                })
            }, 2000);
        })
    }


    changePassword() {
        this.setState({
            changePasswordLoad: true
        })

        let password = {
            CurrentPassword: this.state.oldPassword,
            NewPassword: this.state.newPassword
        }

        fetch('/Account/EditUserPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(password)
        }).then(result => {
            return result.json()
        }).then(e => {
            this.setState({
                changePasswordResponce: e.identityErrors,
                changePasswordLoad: false,
                changePasswordFlag: e.editUserPasswordSucceeded
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
                                <Input type="radio" name="avatar" value="/img/avatar_1.jpg"></Input>
                                <div className="avatar avatar-1 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_2.jpg"></Input>
                                <div className="avatar avatar-2 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_3.jpg"></Input>
                                <div className="avatar avatar-3 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_4.jpg"></Input>
                                <div className="avatar avatar-4 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_5.jpg"></Input>
                                <div className="avatar avatar-5 active-avatar"></div>
                            </InputGroup>
                        </Col>

                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_6.jpg"></Input>
                                <div className="avatar avatar-6 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_7.jpg"></Input>
                                <div className="avatar avatar-7 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_8.jpg"></Input>
                                <div className="avatar avatar-8 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_9.jpg"></Input>
                                <div className="avatar avatar-9 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_10.jpg"></Input>
                                <div className="avatar avatar-10 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_11.jpg"></Input>
                                <div className="avatar avatar-11 active-avatar"></div>
                            </InputGroup>
                        </Col>
                        <Col xs={4} md={3} xl={2}>
                            <InputGroup className="avatar-wrapper">
                                <Input type="radio" name="avatar" value="/img/avatar_12.jpg"></Input>
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
                            {(this.state.changePasswordResponce !== "" && this.state.changePasswordResponce.length > 0) ?
                                <Alert
                                    color={(this.state.changePasswordFlag) ? "success" : "danger"}
                                >
                                    {this.state.changePasswordResponce.map((line, index) => (
                                        <p key={index}>{line.description}</p>
                                    ))}
                                </Alert> : ""}
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