import React, { Component } from 'react'
import "./EditTransactionModal.scss"
import 'react-widgets/lib/scss/react-widgets.scss'
import { DropdownList } from 'react-widgets'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'


export class EditTransactionModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ID: "",
            category: "",
            date: "",
            note: "",
            amount: "",
            categories: ""
        }
    }

    showModal = (transaction, categories) => {
        let date = new Date(transaction.date)
        this.setState({
            ID: transaction.id,
            category: transaction.category,
            date: date,
            note: transaction.coment,
            amount: transaction.amount,
            categories: categories
        })
        let element = document.querySelector(".edit-transaction-modal-wrapper")
        element.classList.remove("edit-transaction-modal-close")
    }

    closeModal = () => {
        let element = document.querySelector(".edit-transaction-modal-wrapper")
        this.setState({
            ID: "",
            category: "",
            date: "",
            note: "",
            amount: "",
            categories: ""
        })

        element.classList.add("edit-transaction-modal-close")
    }

    editTransactionHandler = () => {
        let date = this.state.date
        let transaction = { id: this.state.ID, category: this.state.category, date: date, note: this.state.note, amount: this.state.amount }
        this.props.editTransaction(transaction)
    }


    render() {
        return (
            <div className="edit-transaction-modal-wrapper edit-transaction-modal-close" >
                <div className="edit-transaction-modal-overlay" onClick={this.closeModal}></div>
                <div className="edit-transaction-modal-body col-md-8">
                    <div className="modal-row">
                        <div className="edit-transaction-modal-category">
                            {this.state && this.state.category &&
                                < DropdownList
                                    defaultValue={this.state.category}
                                    data={this.state.categories}
                                    onChange={value => this.setState({ category: value })}
                                    textField="name"
                                    valueField="ID"
                                    placeholder="Select category"
                                />
                            }
                        </div>
                        <div className="edit-transaction-modal-date">
                            <DatePicker
                                selected={this.state.date}
                                onChange={value => this.setState({ date: value })}
                                dateFormat={"dd/MM/yyyy"}
                                placeholderText="Select date"
                                maxDate={new Date()}
                            />
                        </div>
                        <div className="edit-transaction-modal-note">
                            <input type="text" placeholder="Enter note" onChange={value => this.setState({ note: value.target.value })} value={this.state.note}></input>
                        </div>
                        <div className="edit-transaction-amount">
                            <input type="text" placeholder="Enter amount" onChange={value => this.setState({ amount: value.target.value })} value={this.state.amount}></input>
                            <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="modal-row">
                        <div className="edit-transaction-modal-buttons">
                            <button className="edit-transaction-modal-button edit-button" onClick={this.editTransactionHandler}>Edit transaction</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}