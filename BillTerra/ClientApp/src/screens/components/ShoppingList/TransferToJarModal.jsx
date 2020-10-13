import React, { Component } from 'react'
import "./TransferToJarModal.scss"
import 'react-widgets/lib/scss/react-widgets.scss'
import { DropdownList } from 'react-widgets'
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Input, FormFeedback } from 'reactstrap'


export class TransferToJarModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: '',
            amountValidate: false,
            buttonDisabled: false
        }


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            jars: nextProps.jars,
            jar: nextProps.jars[0]
        })
    }

    showModal = () => {
        let element = document.querySelector(".transfer-modal-wrapper")
        element.classList.remove("transfer-modal-close")
        console.log("asfdsda")
    }

    closeModal = () => {
        let element = document.querySelector(".transfer-modal-wrapper")
        let amount = document.querySelector(".transfer-amount > input")
        amount.value = ""

        this.setState({
            jar: this.state.jars[0],
            amount: "",
            amountValidate: false,
            buttonDisabled: false
        })

        element.classList.add("transfer-modal-close")
    }

    transferToJar = () => {
        if (this.state.amountValidate && !this.state.buttonDisabled) {
            this.props.transferToJar(this.state.jar, this.state.amount)
            this.closeModal()
        }
    }


    render() {
        return (
            <div className="transfer-modal-wrapper transfer-modal-close" >
                <div className="transfer-modal-overlay" onClick={this.closeModal}></div>
                <div className="transfer-modal-body col-md-8">
                    <div className="modal-row">
                        <div className="transfer-modal-category">
                            <DropdownList
                                data={this.state.jars}
                                onChange={value => this.setState({ jar: value })}
                                textField="name"
                                valueField="id"
                                placeholder="Select JAR"
                                value={this.state.jar}
                            />
                        </div>
                        <div className="transfer-amount">
                            <Input invalid={!this.state.amountValidate} type="number" placeholder="Enter amount" onChange={value => {
                                let amountFlag = (value.target.value.length > 0) ? true : false
                                let buttonFlag = (amountFlag && this.state.dateValidate) ? true : false
                                this.setState({
                                    amount: value.target.value,
                                    amountValidate: amountFlag,
                                    buttonDisabled: buttonFlag
                                })
                            }}></Input>
                            <FormFeedback>The value must be a number!</FormFeedback>
                        </div>
                    </div>
                    <div className="modal-row">
                        <div className="transfer-modal-buttons">
                            <button className="transfer-modal-button add-button" onClick={this.transferToJar}>Transfer to JAR</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}