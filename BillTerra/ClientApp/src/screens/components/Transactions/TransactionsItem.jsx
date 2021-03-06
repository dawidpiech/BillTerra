import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import "./TransactionsItem.scss"

export class TransactionsItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    editThisTransaction(key) {
        this.props.editTransaction(key)
    }


    deleteThisTransaction(key) {
        this.props.deleteTransaction(key)
    }


    render() {
        let date = new Date(this.props.date)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let formatedDate = day + "/" + month + "/" + year
        return (
            <Row className="transaction-wrapper row" id={this.props.id}>
                <Col className="transaction-date" xs={{ size: 12, order: 1 }} md={{ order: 1 }}>{formatedDate}</Col>
                <Col className="transaction-category" xs={{ size: 6, order: 2 }} md={{ size: 2, order: 2 }}>{this.props.category}</Col>
                <Col className="transaction-note" xs={{ size: 12, order: 4 }} md={{ size: 8, order: 3 }}>{this.props.note}</Col>
                <Col className="transaction-amount" xs={{ size: 6, order: 3 }} md={{ size: 2, order: 4 }}>{this.props.amount + " $"}</Col>
                <Col className="transaction-buttons" xs={{ size: 12, order: 6 }} md={{ order: 5 }}>
                    <button className="transaction-button transaction-button--edit" onClick={() => this.editThisTransaction(this.props.id)}>Edit transaction</button>
                    <button className="transaction-button transaction-button--delete" onClick={() => this.deleteThisTransaction(this.props.id)}>Delete transaction</button>
                </Col>
            </Row>
        )
    }

}