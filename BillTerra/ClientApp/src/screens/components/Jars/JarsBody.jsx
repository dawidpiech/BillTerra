import React, { Component } from 'react'
import "./JarsBody.scss"
import { Container, Row, Col, Input, Form, InputGroup, InputGroupAddon, Button, FormFeedback } from 'reactstrap'
import { Jar } from './Jar'
import { TransferToJarModal } from '../ShoppingList/TransferToJarModal'




export class JarsBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            goal: "",
            jars: [

            ],
            goalFlag: false,
            nameFlag: false,
            balance: 100000
        }
        this.addNewJar = this.addNewJar.bind(this)
        this.deleteJar = this.deleteJar.bind(this)
        this.transferToJar = this.transferToJar.bind(this)
        this.reachTheGoal = this.reachTheGoal.bind(this)
        this.jar = React.createRef()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            jars: nextProps.jars,
            balance: nextProps.balance
        })
    }

    addNewJar(e) {
        e.preventDefault()
        let arr = this.state.jars

        if (this.state.goalFlag && this.state.nameFlag) {
            let newJar = {
                name: this.state.name,
                goal: parseInt(this.state.goal),
                currentAmount: 1,
                state: "in progress"
            }

            fetch('ścieżka', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newJar)
            }).then(e => {
                let newJarTymczasowy = {
                    id: this.state.jars.length + 10,
                    name: this.state.name,
                    goal: parseInt(this.state.goal),
                    currentAmount: 0,
                    state: "in progress"
                }
                arr.unshift(newJarTymczasowy)

                this.setState({
                    items: arr
                })
            })
        }
    }

    deleteJar(id) {
        let index = this.state.jars.findIndex(e => e.id === id)
        fetch('ścieżka', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.jars[index])
        }).then(() => {
            let arr = this.state.jars
            arr.splice(index, 1)

            this.setState({
                jars: arr
            })
        })
    }

    reachTheGoal(id) {
        let index = this.state.jars.findIndex(e => e.id === id)
        fetch('ścieżka', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.jars[index])
        }).then(() => {
            let arr = this.state.jars
            arr.splice(index, 1)

            this.setState({
                jars: arr
            })
        })
    }

    showTransferModal = () => {
        this.jar.current.showModal()
    }

    transferToJar = (jar, amount) => {
        let index = this.state.jars.findIndex(e => e.id === jar.id)
        let arr = this.state.jars

        arr[index].currentAmount = parseFloat(arr[index].currentAmount) + parseFloat(amount)


        fetch('ścieżka', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jar: jar,
                amount: amount
            })
        }).then(() => {
            this.setState({
                jars: arr
            })
        })
    }

    render() {
        return (
            <div className="jars-body-wrapper">
                <Container>
                    <TransferToJarModal ref={this.jar} jars={this.state.jars} transferToJar={this.transferToJar}></TransferToJarModal>
                    <Row>
                        <Col className="jars-form">
                            <Col xs={12} md={12}>
                                <Button onClick={this.showTransferModal} className="transfer-button">TRANSFER TO JAR</Button>
                            </Col>
                            <Form name={"addNewJar"} onSubmit={this.addNewJar}>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <Input className="jar-name" type="text" name="jar-name" placeholder="Enter name" invalid={this.state.name.length > 0 ? false : true} onChange={value => {
                                            let nameFlag = (value.target.value.length > 0) ? true : false
                                            this.setState({
                                                name: value.target.value,
                                                nameFlag: nameFlag
                                            })
                                        }}></Input>
                                    </Col>
                                    <Col xs={12} md={10}>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                            <Input placeholder="Goal" name="jar-goal" min={0} max={this.state.balance} type="number" step="1" placeholder="Enter goal" onChange={value => {
                                                let goalFlag = (value.target.value.length > 0) ? true : false
                                                this.setState({
                                                    goal: value.target.value,
                                                    goalFlag: goalFlag
                                                })
                                            }} />
                                        </InputGroup>
                                        <FormFeedback>The value must be a number!</FormFeedback>
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <Input className="jar-add-button" type="submit" value="ADD"></Input>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="jars-list">
                            {
                                (this.state.jars.length > 0) ? this.state.jars.map(d =>
                                    <Jar
                                        name={d.name}
                                        goal={d.goal}
                                        currentAmount={d.currentAmount}
                                        id={d.id} state={d.state}
                                        deleteJar={this.deleteJar}
                                        reachTheGoal={this.reachTheGoal}>

                                    </Jar>
                                )
                                    : <h1>Currently you haven't any GOAL's</h1>
                            }

                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}