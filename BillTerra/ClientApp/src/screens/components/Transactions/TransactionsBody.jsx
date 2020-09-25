import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import "./TransactionsBody.scss"
import { TransactionsItem } from "./TransactionsItem"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/lib/scss/react-widgets.scss'
import DropdownList from 'react-widgets/lib/DropdownList'
import { AddIncomeModal } from "./AddIncomeModal"
import { AddExpenseModal } from "./AddExpenseModal"
import { EditTransactionModal } from "./EditTransactionModal"




const sortedArray = [
    { ID: 1, name: "Sort by date descending" },
    { ID: 2, name: "Sort by date ascending" },
    { ID: 3, name: "Sort by amount descending" },
    { ID: 4, name: "Sort by amount ascending" }
]
export class TransactionsBody extends Component {


    constructor(props) {
        super(props)
        this.state = {
        };

        this.income = React.createRef();
        this.expense = React.createRef();
        this.edit = React.createRef();
        this.editTransaction = this.editTransaction.bind(this)
        this.deleteTransaction = this.deleteTransaction.bind(this)
        this.changeCategory = this.changeCategory.bind(this)
        this.editTransactionOnDatabase = this.editTransactionOnDatabase.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            transactions: nextProps.transactions,
            visibleTransactions: nextProps.transactions,
            incomeCategory: nextProps.incomesCategory,
            expensesCategory: nextProps.expensesCategory,
            selectedCategory: nextProps.expensesCategory.concat(nextProps.incomesCategory),
            allCategory: nextProps.expensesCategory.concat(nextProps.incomesCategory),
            startDate: null,
            endDate: null,
            sortBy: sortedArray[0]
        })
    }

    ////////////////////////////////////////////////
    ///ADD EDIT AND DELETE TRANSACTIONS FUNCTIONS///
    ////////////////////////////////////////////////

    editTransaction(transactionID) {                              //tutaj musisz zrobić funkcję która prześle obiekt to komponentu do edycji
        let transactionIndexInArray = this.state.transactions.findIndex(obj => {
            return obj.id === transactionID
        })

        let categories = (this.state.transactions[transactionIndexInArray].isExpense) ? this.state.incomeCategory : this.state.expensesCategory


        this.showEditModal(this.state.transactions[transactionIndexInArray], categories)
    }

    editTransactionOnDatabase(transaction) {

        let data = this.state.transactions
        let visibleData = this.state.visibleTransactions
        let transactionIndexInArray = data.findIndex(obj => {
            return obj.id === transaction.id
        })

        let transactionIndexInVisibleArray = visibleData.findIndex(obj => {
            return obj.id === transaction.id
        })
        data[transactionIndexInArray] = transaction
        visibleData[transactionIndexInVisibleArray] = transaction

        fetch('/Transaction/EditTrasactioin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction)
        }).then(() => {
            this.setState({
                transactions: data,
                visibleTransactions: visibleData
            })

            this.edit.current.closeModal()
        }).catch(error => {
            console.log(error)
        })
    }

    deleteTransaction(transactionID) {
        let transactionIndexInArray = this.state.transactions.findIndex(obj => {
            return obj.id === transactionID
        })

        let deletedTransaction = this.state.transactions[transactionIndexInArray]

        let updatedTransactionArray = this.state.transactions
        updatedTransactionArray = updatedTransactionArray.filter(obj => {
            return obj.id !== transactionID
        })


        let updatedVisibleTransactionArray = this.state.visibleTransactions
        updatedVisibleTransactionArray = updatedVisibleTransactionArray.filter(obj => {
            return obj.id !== transactionID
        })

        let category = {
            ID: deletedTransaction.category.id,
            Name: deletedTransaction.category.name
        }

        let formatedTransaction = {
            ID: deletedTransaction.id,
            Category: category,
            Date: deletedTransaction.date,
            Coment: deletedTransaction.coment,
            Amount: deletedTransaction.amount,
            IsExpense: deletedTransaction.isExpense
        }

        fetch('/Transaction/DeleteTrasactioin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formatedTransaction)
        }).then(() => {
            this.setState({
                visibleTransactions: updatedVisibleTransactionArray,
                transactions: updatedTransactionArray
            })
        }).catch(error => {
            console.log(error)
        })
    }


    ////////////////////////////////////////////////
    //////////ADD NEW TRANSACTIONS FUNCTIONS////////
    ////////////////////////////////////////////////

    addNewTransaction = (category, date, note, amount, IncomeOrExpenseFlag) => {
        let transaction = { ID: 0, Category: category, Date: date, Coment: note, Amount: amount, IsExpense: IncomeOrExpenseFlag }
        let transactions = this.state.transactions
        let visibleTransactions = this.state.visibleTransactions

        fetch('/Transaction/AddTransactioin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction)
        }).then(result => {
            return result.json()
        }).then(responce => {
            let responceVisibleTransactions = [responce].concat(visibleTransactions)
            let responceTransactions = [responce].concat(transactions)

            this.setState({
                transactions: responceTransactions,
                visibleTransactions: responceVisibleTransactions
            })

            this.income.current.closeModal()
            this.expense.current.closeModal()
        }).catch(error => {
            console.log("ERROR: " + error)
        })
    }

    ////////////////////////////////////////////////
    //FUNCTIONS TO MODIFICATE VISIBLE TRANSACTIONS//
    ////////////////////////////////////////////////
    filterTransactionsByDataFrom(transactions, date) {
        let a = transactions.filter(d => {
            let transactionDate = new Date(d.date)
            return (transactionDate.getTime() >= date.getTime())
        })
        return a
    }


    filterTransactionsByDataTo(transactions, date) {
        let a = transactions.filter(d => {
            let transactionDate = new Date(d.date)
            return (transactionDate.getTime() <= date.getTime())
        })
        return a
    }

    filterByCategory(transactions, categoryList) {
        let data
        let categoryID = []
        for (let i = 0; i < categoryList.length; i++) {
            categoryID.push(categoryList[i].id)
        }

        data = transactions.filter(d => {
            return (categoryID.includes(d.category.id))
        })

        return data
    }

    sortTransactions(transactions, sortBy) {
        let data = transactions
        switch (sortBy) {
            case 1: {
                data.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
                break
            }
            case 2: {
                data.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
                break
            }
            case 4: {
                data.sort((a, b) => (a.amount > b.amount) ? 1 : ((b.amount > a.amount) ? -1 : 0))
                break
            }
            case 3: {
                data.sort((a, b) => (a.amount < b.amount) ? 1 : ((b.amount < a.amount) ? -1 : 0))
                break
            }
        }

        return data
    }


    ////////////////////////////////////////////
    /////HANDLERS TO FILTER TRANSACTIONS////////
    ////////////////////////////////////////////

    selectTransactionFrom = date => {
        let transactionsFromState = this.state.transactions
        let visibleData = this.filterTransactionsByDataFrom(transactionsFromState, date)
        if (this.state.endDate !== null)
            visibleData = this.filterTransactionsByDataTo(visibleData, this.state.endDate)


        visibleData = this.filterByCategory(visibleData, this.state.selectedCategory)
        visibleData = this.sortTransactions(visibleData, this.state.sortBy)


        this.setState({
            startDate: date,
            visibleTransactions: visibleData
        });
    }

    selectTransactionTo = date => {
        let data = this.state.transactions
        let visibleData = this.filterTransactionsByDataTo(data, date)
        if (this.state.startDate !== null)
            visibleData = this.filterTransactionsByDataFrom(visibleData, this.state.startDate)


        visibleData = this.filterByCategory(visibleData, this.state.selectedCategory)
        visibleData = this.sortTransactions(visibleData, this.state.sortBy)

        this.setState({
            endDate: date,
            visibleTransactions: visibleData
        });
    }

    changeCategory(selectedCategory) {
        let visibleData = this.filterByCategory(this.state.transactions, selectedCategory)
        if (this.state.startDate !== null)
            visibleData = this.filterTransactionsByDataFrom(visibleData, this.state.startDate)
        if (this.state.endDate !== null)
            visibleData = this.filterTransactionsByDataTo(visibleData, this.state.endDate)

        visibleData = this.sortTransactions(visibleData, this.state.sortBy)

        this.setState({
            selectedCategory: selectedCategory,
            visibleTransactions: visibleData
        });
    }

    selectSortBy = (selectedItem) => {
        let data = this.state.visibleTransactions
        let visibleData = this.sortTransactions(data, selectedItem.ID)

        this.setState({
            sortBy: selectedItem,
            visibleTransactions: visibleData
        });
    }

    showModalAddNewIncome = () => {
        this.income.current.showModal()
    }

    showModalAddNewExpense = () => {
        this.expense.current.showModal()
    }


    showEditModal = (transaction, categories) => {
        this.edit.current.showModal(transaction, categories)
    }

    render() {

        return (
            <div className="dashboard_body_container">
                <Container>
                    <AddIncomeModal ref={this.income} addNewTransaction={this.addNewTransaction} categories={this.state.incomeCategory}></AddIncomeModal>
                    <AddExpenseModal ref={this.expense} addNewTransaction={this.addNewTransaction} categories={this.state.expensesCategory}></AddExpenseModal>
                    <EditTransactionModal ref={this.edit} editTransaction={this.editTransactionOnDatabase}></EditTransactionModal>
                    <Row className="add-transactions-section">
                        <Col className="add-transaction-buttons-container" sm={12} md={6}>
                            <button className="add-transaction-button add-transaction-button-income" onClick={this.showModalAddNewIncome}>Add Income</button>
                            <button className="add-transaction-button add-transaction-button-expense" onClick={this.showModalAddNewExpense}>Add Expense</button>
                        </Col>
                        <Col md={3} className="date">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.selectTransactionFrom}
                                dateFormat={"dd/MM/yyyy"}
                                placeholderText="Select transaction from"
                                maxDate={new Date()}
                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                            />

                        </Col>
                        <Col md={3} className="date">
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.selectTransactionTo}
                                dateFormat={"dd/MM/yyyy"}
                                placeholderText="Select transaction to"
                                maxDate={new Date()}
                                minDate={this.state.startDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                            />
                        </Col>


                    </Row>
                    <Row className="filters-section">
                        <Col className="category-filter" sm={12} md={8}>
                            <Multiselect
                                data={this.state.allCategory}
                                valueField="id"
                                textField="name"
                                value={this.state.selectedCategory}
                                onChange={this.changeCategory}
                                placeholder="Select categories"
                                showPlaceholderWithValues={false}
                            />
                        </Col>
                        <Col className="sort-filter" sm={12} md={4}>
                            <DropdownList
                                data={sortedArray}
                                valueField="ID"
                                textField="name"
                                defaultValue={sortedArray[0]}
                                onChange={this.selectSortBy}
                            />
                        </Col>
                    </Row>
                    <Row className="transactions-section">
                        <Col>
                            {
                                (this.state.visibleTransactions !== undefined) ? this.state.visibleTransactions.map((d) => <TransactionsItem
                                    key={d.id}
                                    id={d.id}
                                    date={d.date}
                                    category={d.category.name}
                                    note={d.coment}
                                    amount={d.amount}
                                    editTransaction={this.editTransaction}
                                    deleteTransaction={this.deleteTransaction}
                                    showEditModal={this.showEditModal}>
                                </TransactionsItem>)
                                    : <h1>Currently you haven't any transactions</h1>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
