import React, { Component } from 'react'
import "./AddIncomeModal.scss"
import 'react-widgets/lib/scss/react-widgets.scss'
import { DropdownList } from 'react-widgets'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'



let today = new Date()
export class AddIncomeModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            date: today,
            note: '',
            amount: '',
            categories: this.props.categories,
            expenseOrIncome: true
        }
    }

    showModal = () => {
        let element = document.querySelector(".add-income-modal-wrapper")
        element.classList.remove("income-modal-close")
    }

    closeModal = () => {
        let element = document.querySelector(".add-income-modal-wrapper")
        let note = document.querySelector(".add-income-modal-note > input")
        let amount = document.querySelector(".add-income-amount > input")

        this.setState({
            category: '',
            date: today,
            note: '',
            amount: '',
            categories: this.props.categories,
            expenseOrIncome: true
        })

        note.value = ""
        amount.value = ""
        element.classList.add("income-modal-close")

    }

    addTransaction = () => {
        this.props.addNewTransaction(this.state.category, this.state.date, this.state.note, this.state.amount)
    }


    render() {
        return (
            <div className="add-income-modal-wrapper income-modal-close" >
                <div className="add-income-modal-overlay" onClick={this.closeModal}></div>
                <div className="add-income-modal-body col-md-8">
                    <div className="modal-row">
                        <div className="add-income-modal-category">
                            <DropdownList
                                defaultValue={this.state.categories[0]}
                                data={this.state.categories}
                                onChange={value => this.setState({ category: value })}
                                textField="name"
                                valueField='ID'
                                placeholder="Select category"
                            />
                        </div>
                        <div className="add-income-modal-date">
                            <DatePicker
                                selected={this.state.date}
                                onChange={value => this.setState({ date: value })}
                                dateFormat={"dd/MM/yyyy"}
                                placeholderText="Select date"
                                maxDate={new Date()}
                            />
                        </div>
                        <div className="add-income-modal-note">
                            <input type="text" placeholder="Enter note" onChange={value => this.setState({ note: value.target.value })}></input>
                        </div>
                        <div className="add-income-amount">
                            <input type="text" placeholder="Enter amount" onChange={value => this.setState({ amount: value.target.value })}></input>
                            <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="modal-row">
                        <div className="add-income-modal-buttons">
                            <button className="add-income-modal-button add-button" onClick={this.addTransaction}>Add income</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}