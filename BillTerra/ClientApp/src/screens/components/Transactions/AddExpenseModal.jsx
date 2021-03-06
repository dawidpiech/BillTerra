import React, { Component } from 'react'
import "./AddExpenseModal.scss"
import 'react-widgets/lib/scss/react-widgets.scss'
import { DropdownList } from 'react-widgets'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { Input, FormGroup, FormFeedback } from 'reactstrap'



let today = new Date()
export class AddExpenseModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: today,
            note: '',
            amount: '',
            expenseOrIncome: false,
            amountValidate: false,
            dateValidate: true,
            buttonDisabled: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps.categories,
            category: nextProps.categories[0]
        })
    }

    showModal = () => {
        let element = document.querySelector(".add-expense-modal-wrapper")
        element.classList.remove("expense-modal-close")
    }

    closeModal = () => {
        let element = document.querySelector(".add-expense-modal-wrapper")

        let note = document.querySelector(".add-expense-modal-note > input")
        let amount = document.querySelector(".add-expense-amount > input")
        this.setState({
            date: today,
            note: '',
            amount: '',
            categories: this.state.categories,
            expenseOrIncome: false
        })

        note.value = ""
        amount.value = ""
        element.classList.add("expense-modal-close")

    }

    addTransaction = () => {
        this.props.addNewTransaction(this.state.category, this.state.date, this.state.note, this.state.amount, this.state.expenseOrIncome)
    }


    render() {
        return (
            <div className="add-expense-modal-wrapper expense-modal-close" >
                <div className="add-expense-modal-overlay" onClick={this.closeModal}></div>
                <div className="add-expense-modal-body col-md-8">
                    <div className="modal-row">
                        <div className="add-expense-modal-category">
                            <DropdownList
                                data={this.state.categories}
                                onChange={value => this.setState({ category: value })}
                                textField="name"
                                valueField="id"
                                placeholder="Select category"
                                value={this.state.category}
                            />
                        </div>
                        <div className="add-expense-modal-date">
                            <DatePicker
                                selected={this.state.date}
                                onChange={value => {
                                    let dateFlag = (value !== null) ? true : false
                                    let buttonFlag = (dateFlag && this.state.amountValidate) ? true : false
                                    this.setState({
                                        date: value,
                                        dateValidate: dateFlag,
                                        buttonDisabled: buttonFlag
                                    })
                                }}
                                dateFormat={"dd/MM/yyyy"}
                                placeholderText="Select date"
                                maxDate={new Date()}
                            />
                        </div>
                        <div className="add-expense-modal-note">
                            <input type="text" placeholder="Enter note" onChange={value => this.setState({ note: value.target.value })}></input>
                        </div>
                        <div className="add-expense-amount">
                            <Input invalid={!this.state.amountValidate} type="number" placeholder="Enter amount" onChange={value => {
                                let amountFlag = (value.target.value.length > 0) ? true : false
                                let buttonFlag = (amountFlag && this.state.dateValidate) ? true : false
                                this.setState({
                                    amount: value.target.value,
                                    amountValidate: amountFlag,
                                    buttonDisabled: buttonFlag
                                })
                            }}></Input>
                            <FormFeedback></FormFeedback>
                            <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="modal-row">
                        <div className="add-expense-modal-buttons">
                            <button className="add-expense-modal-button add-button" onClick={this.addTransaction}>Add expense</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}