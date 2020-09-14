import React, { Component } from 'react'
import "./AddExpenseModal.scss"
import 'react-widgets/lib/scss/react-widgets.scss'
import { DropdownList } from 'react-widgets'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'



let today = new Date()
export class AddExpenseModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            date: today,
            note: '',
            amount: '',
            categories: this.props.categories,
            expenseOrIncome: false
        }
    }

    showModal = () => {
        let element = document.querySelector(".add-transaction-modal-wrapper")
        element.classList.remove("transaction-modal-close")
    }

    closeModal = () => {
        let element = document.querySelector(".add-transaction-modal-wrapper")
        this.setState({
            category: '',
            date: '',
            note: '',
            amount: '',
            categories: [],
            expenseOrIncome: ''
        })
        document.querySelector(".add-transaction-modal-category > #rw_1_input > div.rw-widget-input.rw-widget-picker.rw-widget-container > div > input").value = ""
        element.classList.add("transaction-modal-close")
    }

    addTransaction() {
        this.props.addNewTransaction(this.state.category, this.state.date, this.state.note, this.state.amount)
    }


    render() {
        return (
            <div className="add-transaction-modal-wrapper transaction-modal-close" >
                <div className="add-transaction-modal-overlay" onClick={this.closeModal}></div>
                <div className="add-transaction-modal-body col-md-8">
                    <div className="modal-row">
                        <div className="add-transaction-modal-category">
                            <DropdownList
                                data={this.state.categories}
                                allowCreate="onFilter"
                                onChange={value => this.setState({ category: value })}
                                textField="name"
                                placeholder="Select category"
                            />
                        </div>
                        <div className="add-transaction-modal-date">
                            <DatePicker
                                selected={this.state.date}
                                onChange={value => this.setState({ date: value })}
                                dateFormat={"dd/MM/yyyy"}
                                placeholderText="Select date"
                                maxDate={new Date()}
                            />
                        </div>
                        <div className="add-transaction-modal-note">
                            {/* <div className="textarea" role="textbox" contenteditable="true" aria-multiline="true" aria-labelledby="txtboxMultilineLabel" aria-required="false"></div> */}
                            <input type="text" placeholder="Enter note" onChange={value => this.setState({ note: value.target.value })}></input>
                        </div>
                        <div className="add-transaction-amount">
                            <input type="text" placeholder="Enter amount" onChange={value => this.setState({ amount: value.target.value })}></input>
                            <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="modal-row">
                        <div className="add-transaction-modal-buttons">
                            <button className="add-transaction-modal-button add-button" onClick={this.addTransaction}>Add transaction</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}