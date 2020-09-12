import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Multiselect } from "multiselect-react-dropdown"
import "./TransactionsBody.scss"
import { TransactionsItem } from "./TransactionsItem"

let today = new Date()
let data = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
export class TransactionsBody extends Component {


    constructor(props) {
        super(props)
        this.state = {
            transactions: [
                { id: 1234, category: "Kategoria", date: data, note: "Jakaś notatka sfsd xcz vzxc", amount: 12000 },
                { id: 1235, category: "Kategoria", date: data, note: "Jakaś notatsdafk1234a sfsd xcz vzxc", amount: 12000 },
                { id: 1236, category: "Kategoria", date: data, note: "Jakaś notatka sf3142sd xcz vasdfzxc", amount: 12000 },
                { id: 1237, category: "Kategoria", date: data, note: "Jakaś notatkasdfa sf12#$sd xcz vzxc", amount: 12000 },
                { id: 1238, category: "Kategoria", date: data, note: "Jakaś notatka sfsd xcz vzxc", amount: 12000 },
                { id: 1239, category: "Kategoria", date: data, note: "Jakaś notatka s1234fsd xcz vzxc", amount: 12000 },
                { id: 1231, category: "Kategoria", date: data, note: "Jakaś notatkavczx sfsd ##FD xcz vzxc", amount: 12000 },
                { id: 1232, category: "Kategoria", date: data, note: "Jakaś notatka sfsd $%xcz vzxc", amount: 12000 }
            ],
            visibleTransactions: [
                { id: 1234, category: "Kategoria", date: data, note: "Jakaś notatka sfsd xcz vzxc", amount: 12000 },
                { id: 1235, category: "Kategoria", date: data, note: "Jakaś notatsdafk1234a sfsd xcz vzxc", amount: 12000 },
                { id: 1236, category: "Kategoria", date: data, note: "Jakaś notatka sf3142sd xcz vasdfzxc", amount: 12000 },
                { id: 1231, category: "Kategoria", date: data, note: "Jakaś notatkavczx sfsd ##FD xcz vzxc", amount: 12000 },
                { id: 1232, category: "Kategoria", date: data, note: "Jakaś notatka sfsd $%xcz vzxc", amount: 12000 }
            ],
            incomeCategory: [
                { ID: 123, name: "Income Category 1" },
                { ID: 12, name: "Income Category 2" },
                { ID: 1, name: "Income Category 3" },
                { ID: 2, name: "Income Category 4" },
                { ID: 3, name: "Income Category 5" },
                { ID: 4, name: "Income Category 6" },
                { ID: 5, name: "Income Category 7" }
            ],
            expensesCategory: [
                { ID: 223, name: "Expnse Category 1" },
                { ID: 22, name: "Expnse Category 2" },
                { ID: 6, name: "Expnse Category 3" },
                { ID: 7, name: "Expnse Category 4" },
                { ID: 8, name: "Expnse Category 5" },
                { ID: 9, name: "Expnse Category 6" },
                { ID: 15, name: "Expnse Category 7" }
            ],
            sortArrayValues: [
                { id: 1, name: "Sort by date ascending" },
                { id: 2, name: "Sort by date descending" },
                { id: 3, name: "Sort by amount ascending" },
                { id: 4, name: "Sort by amount ascending" }
            ]
        };


        this.editTransaction = this.editTransaction.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this)
    }


    addCategoryToFilters(selectedList, selectedItem) {              //tutaj tylko filtrowanie to jest po twojej stronie nic nie wysyłasz do servera
        console.log(selectedList)
        console.log(selectedItem)
    }

    removeCategoryFromFilters(selectedList, selectedItem) {             //tutaj tylko filtrowanie to jest po twojej stronie nic nie wysyłasz do servera
        console.log(selectedList)
        console.log(selectedItem)
    }


    editTransaction(transactionID) {                                          //tutaj musisz zrobić funkcję która prześle obiekt to komponentu do edycji
        let transactionIndexInArray = this.state.transactions.findIndex(obj => { //tutaj wywołać funkcję dziecka z poziomu rodzica aplikacji.
            return obj.id === transactionID
        })

        let updatedTransaction = this.state.transactions[transactionIndexInArray]

        console.log(updatedTransaction)
        this.editTransactionOnDatabase()
    }

    editTransactionOnDatabase() {

    }

    deleteTransaction(transactionID) {                                    //tutaj polecenie dusunięcia do servera i usuwasz z widoku 
        let transactionIndexInArray = this.state.transactions.findIndex(obj => {
            return obj.id === transactionID
        })

        let transactionIndexInVisibleArray = this.state.visibleTransactions.findIndex(obj => {
            return obj.id === transactionID
        })

        let deletedTransaction = this.state.transactions[transactionIndexInArray]

        let updatedTransactionArray = this.state.transactions;
        updatedTransactionArray.splice(transactionIndexInArray, 1)

        let updatedVisibleTransactionArray = this.state.visibleTransactions;
        updatedVisibleTransactionArray.splice(transactionIndexInVisibleArray, 1)

        this.setState({
            visibleTransactions: updatedVisibleTransactionArray,
            transactions: updatedTransactionArray
        })

        this.deleteTransactionFromDatabase(deletedTransaction)
    }

    deleteTransactionFromDatabase(transaction) {
        // fetch('api/[nazwa kontrolera bez controlers]]/[nazwa funkcji]]', {  //funkcja usuwająca rekord z bazy danych
        //     method: 'POST',
        //     body: JSON.stringify({
        //         transaction
        //     })
        // }).then(responce => {
        // }).catch(error => {
        // })

        console.log(transaction)
    }


    render() {
        const sortStyle = {
            searchBox: {
                minHeight: "44px",
            },
            inputField: {
                fontSize: "16px"
            },
            chips: {
                color: "rgb(170, 170, 170)",
                fontSize: "16px"
            }
        }

        const categoryMultiselectStyle = {              //https://www.npmjs.com/package/multiselect-react-dropdown
            searchBox: {
                fontSize: "14px",
                minHeight: "44px",
                overflow: "hidden",
            },
            inputField: {
                margin: "5px"
            },
            chips: {
                background: "#12CEAD",
                fontSize: "12px",
                padding: "2px 5px"
            },
            optionContainer: {
                border: "1px solid"
            },
            option: {
                color: `rgba(18, 206, 173, 0.5)`,
            }
        };





        return (
            <div className="dashboard_body_container">
                <Container>
                    <Row className="add-transactions-section">
                        <Col className="add-transaction-buttons-container" sm={12} md={4}>
                            <button className="add-transaction-button add-transaction-button-income">Add Income</button>
                            <button className="add-transaction-button add-transaction-button-expense">Add Expense</button>
                        </Col>
                        <Col sm={12} md={4} lg={3} className="date">
                            <input type="text" value="fasdfds" onfocus="(this.type='date')" onblur="(this.type='text')"></input>

                        </Col>
                        <Col sm={12} md={4} lg={3} className="date">
                            <input type="date"></input>
                        </Col>
                    </Row>
                    <Row className="filters-section">
                        <Col className="category-filter" sm={12} md={8}>
                            <Multiselect
                                options={this.state.incomeCategory.concat(this.state.expensesCategory)}
                                displayValue="name"
                                style={categoryMultiselectStyle}
                                placeholder=""
                                selectedValues={this.state.incomeCategory.concat(this.state.expensesCategory)}
                                onSelect={this.addCategoryToFilters}
                                onRemove={this.removeCategoryFromFilters}
                                closeOnSelect={false}

                            />
                        </Col>
                        <Col className="sort-filter" sm={12} md={4}>
                            <Multiselect
                                options={this.state.sortArrayValues}
                                displayValue="name"
                                style={sortStyle}
                                placeholder={this.state.sortArrayValues[0].name}
                                singleSelect
                            />
                        </Col>
                    </Row>
                    <Row className="transactions-section">
                        <Col>
                            {this.state.visibleTransactions.map((d) => <TransactionsItem
                                key={d.id}
                                id={d.id}
                                date={d.date}
                                category={d.category}
                                note={d.note}
                                amount={d.amount}
                                editTransaction={this.editTransaction}
                                deleteTransaction={this.deleteTransaction}>
                            </TransactionsItem>)}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
