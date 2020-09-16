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
        let element = document.querySelector(".add-expense-modal-wrapper")
        element.classList.remove("expense-modal-close")
    }

    closeModal = () => {
        let element = document.querySelector(".add-expense-modal-wrapper")
        this.setState({
            category: this.props.categories[0],
            date: today,
            note: '',
            amount: '',
            categories: this.props.categories,
            expenseOrIncome: false
        })

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
                                defaultValue={this.state.categories[0]}
                                data={this.state.categories}
                                onChange={value => this.setState({ category: value })}
                                textField="name"
                                valueField='ID'
                                placeholder="Select category"
                            />
                        </div>
                        <div className="add-expense-modal-date">
                            <DatePicker
                                selected={this.state.date}
                                onChange={value => this.setState({ date: value })}
                                dateFormat={"dd/MM/yyyy"}
                                placeholderText="Select date"
                                maxDate={new Date()}
                            />
                        </div>
                        <div className="add-expense-modal-note">
                            <input type="text" placeholder="Enter note" onChange={value => this.setState({ note: value.target.value })}></input>
                        </div>
                        <div className="add-expense-amount">
                            <input type="text" placeholder="Enter amount" onChange={value => this.setState({ amount: value.target.value })}></input>
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