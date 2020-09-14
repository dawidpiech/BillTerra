import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import "./TransactionsBody.scss"
import { TransactionsItem } from "./TransactionsItem"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/lib/scss/react-widgets.scss'
import DropdownList from 'react-widgets/lib/DropdownList'
//import { AddTransactionModal } from "./AddTransactionModal"
import { AddIncomeModal } from "./AddIncomeModal"
import { AddExpenseModal } from "./AddExpenseModal"




let today = new Date()
let data = (today.getDate() - 10) + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
let data2 = (today.getDate() - 2) + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()

let kat1 = { ID: 22, name: "Income Category 2" }
let kat2 = { ID: 3, name: "Expnse Category 3" }
export class TransactionsBody extends Component {


    constructor(props) {
        super(props)
        this.state = {
            transactions: [
                { id: 1234, category: kat1, date: data, note: "Jakaś notatka sfsd xcz vzxc", amount: 12200 },
                { id: 1235, category: kat1, date: data, note: "Jakaś notatsdafk1234a sfsd xcz vzxc", amount: 1200 },
                { id: 1236, category: kat1, date: data, note: "Jakaś notatka sf3142sd xcz vasdfzxc", amount: 12070 },
                { id: 1237, category: kat2, date: data2, note: "Jakaś notatkasdfa sf12#$sd xcz vzxc", amount: 120100 },
                { id: 1238, category: kat2, date: data, note: "Jakaś notatka sfsd xcz vzxc", amount: 1203200 },
                { id: 1239, category: kat2, date: data2, note: "Jakaś notatka s1234fsd xcz vzxc", amount: 1200120 },
                { id: 1231, category: kat2, date: data, note: "Jakaś notatkavczx sfsd ##FD xcz vzxc", amount: 1212000 },
                { id: 1232, category: kat2, date: data, note: "Jakaś notatka sfsd $%xcz vzxc", amount: 1204400 }
            ],
            visibleTransactions: [
                { id: 1234, category: kat1, date: data, note: "Jakaś notatka sfsd xcz vzxc", amount: 12200 },
                { id: 1235, category: kat1, date: data, note: "Jakaś notatsdafk1234a sfsd xcz vzxc", amount: 1200 },
                { id: 1236, category: kat1, date: data, note: "Jakaś notatka sf3142sd xcz vasdfzxc", amount: 12070 },
                { id: 1237, category: kat2, date: data2, note: "Jakaś notatkasdfa sf12#$sd xcz vzxc", amount: 120100 },
                { id: 1232, category: kat2, date: data, note: "Jakaś notatka sfsd $%xcz vzxc", amount: 1204400 }
            ],
            incomeCategory: [                           //expenses category from server
                { ID: 223, name: "Income Category 1" },
                { ID: 22, name: "Income Category 2" },
                { ID: 6, name: "Income Category 3" },
                { ID: 7, name: "Income Category 4" },
                { ID: 8, name: "Income Category 5" },
                { ID: 9, name: "Income Category 6" },
                { ID: 15, name: "Income Category 7" }
            ],
            expensesCategory: [                         //income category from server
                { ID: 1, name: "Expnse Category 1" },
                { ID: 2, name: "Expnse Category 2" },
                { ID: 3, name: "Expnse Category 3" },
                { ID: 4, name: "Expnse Category 4" },
                { ID: 5, name: "Expnse Category 5" },
                { ID: 10, name: "Expnse Category 6" },
                { ID: 11, name: "Expnse Category 7" }
            ],
            selectedCategory: [                             //category which are selected in filters
                { ID: 223, name: "Income Category 1" },
                { ID: 22, name: "Income Category 2" },
                { ID: 6, name: "Income Category 3" },
                { ID: 7, name: "Income Category 4" },
                { ID: 8, name: "Income Category 5" },
                { ID: 9, name: "Income Category 6" },
                { ID: 15, name: "Income Category 7" },
                { ID: 1, name: "Expnse Category 1" },
                { ID: 2, name: "Expnse Category 2" },
                { ID: 3, name: "Expnse Category 3" },
                { ID: 4, name: "Expnse Category 4" },
                { ID: 5, name: "Expnse Category 5" },
                { ID: 10, name: "Expnse Category 6" },
                { ID: 11, name: "Expnse Category 7" }
            ],
            sortArrayValues: [
                { ID: 1, name: "Sort by date descending" },
                { ID: 2, name: "Sort by date ascending" },
                { ID: 3, name: "Sort by amount descending" },
                { ID: 4, name: "Sort by amount ascending" }
            ],
            startDate: null,
            endDate: null,
            sortBy: ""
        };

        this.income = React.createRef();
        this.expense = React.createRef();
        this.editTransaction = this.editTransaction.bind(this)
        this.deleteTransaction = this.deleteTransaction.bind(this)
        this.changeCategory = this.changeCategory.bind(this)
    }

    ////////////////////////////////////////////////
    ///ADD EDIT AND DELETE TRANSACTIONS FUNCTIONS///
    ////////////////////////////////////////////////

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

    ////////////////////////////////////////////////
    //////////ADD NEW TRANSACTIONS FUNCTIONS////////
    ////////////////////////////////////////////////

    addNewTransaction = (category, date, note, amount) => {
        let fromatedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
        let transaction = { category, fromatedDate, note, amount }

        let transactions = this.state.transactions
        let visibleTransactions = this.state.visibleTransactions

        transactions.unshift(transaction)
        visibleTransactions.unshift(transaction)

        // this.setState({
        //     transaction: transactions,
        //     visibleTransactions: visibleTransactions
        // })

        this.income.current.closeModal()
        this.expense.current.closeModal()


        console.log(transactions)
        console.log(visibleTransactions)




        // fetch('api/[nazwa kontrolera bez controlers]]/[nazwa funkcji]]', {  //funkcja usuwająca rekord z bazy danych
        //     method: 'POST',
        //     body: JSON.stringify({
        //         transaction
        //     })
        // }).then(responce => {
        //     let transactions = this.state.transactions.unshift(transaction)
        //     let visibleTransactions = this.state.visibleTransactions.unshift(transaction)
        //     this.setState({
        //         transaction: transactions,
        //         visibleTransactions: visibleTransactions
        //     })
        //     console.log(responce)
        // }).catch(error => {
        //     console.log(error)
        // })
    }

    ////////////////////////////////////////////////
    //FUNCTIONS TO MODIFICATE VISIBLE TRANSACTIONS//
    ////////////////////////////////////////////////
    filterTransactionsByDataFrom(transactions, date) {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let dateFrom = new Date(year, month, day)
        let a = transactions.filter(d => {
            let transactionDateSplit = d.date.split("/")
            let year = transactionDateSplit[2]
            let month = transactionDateSplit[1]
            let day = transactionDateSplit[0]
            let transactionDate = new Date(year, month, day)
            return (transactionDate.getTime() >= dateFrom.getTime())
        })
        console.log(a)
        return a
    }


    filterTransactionsByDataTo(transactions, date) {
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let dateFrom = new Date(year, month, day)
        let a = transactions.filter(d => {
            let transactionDateSplit = d.date.split("/")
            let year = transactionDateSplit[2]
            let month = transactionDateSplit[1]
            let day = transactionDateSplit[0]
            let transactionDate = new Date(year, month, day)
            return (transactionDate.getTime() <= dateFrom.getTime())
        })
        console.log(a)
        return a
    }

    filterByCategory(transactions, categoryList) {
        let data
        let categoryID = []
        for (let i = 0; i < categoryList.length; i++) {
            categoryID.push(categoryList[i].ID)
        }

        data = transactions.filter(d => {
            return (categoryID.includes(d.category.ID))
        })

        return data
    }

    sortTransactions(transactions, sortBy) {
        let data
        switch (sortBy) {
            case 1: {
                data = transactions.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
            }
            case 2: {
                data = transactions.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))
            }
            case 3: {
                data = transactions.sort((a, b) => (a.amount > b.amount) ? 1 : ((b.amount > a.amount) ? -1 : 0))
            }
            case 4: {
                data = transactions.sort((a, b) => (a.amount < b.amount) ? 1 : ((b.amount < a.amount) ? -1 : 0))
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
        let finalData
        if (this.state.endDate !== null)
            finalData = this.filterTransactionsByDataTo(visibleData, this.state.endDate)
        else
            finalData = visibleData

        this.setState({
            startDate: date,
            visibleTransactions: finalData
        });
    }

    selectTransactionTo = date => {
        let data = this.state.transactions
        let visibleData = this.filterTransactionsByDataTo(data, date)
        let finalData
        if (this.state.startDate !== null)
            finalData = this.filterTransactionsByDataFrom(visibleData, this.state.startDate)
        else
            finalData = visibleData

        this.setState({
            endDate: date,
            visibleTransactions: visibleData
        });
    }

    changeCategory(selectedCategory) {
        let visibleData = this.filterByCategory(this.state.transactions, selectedCategory)


        this.setState({
            selectedCategory: selectedCategory,
            visibleTransactions: visibleData
        });
    }

    selectSortBy(selectedItem) {
        console.log(selectedItem)
        let data = this.state.transactions
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




    render() {
        return (
            <div className="dashboard_body_container">
                <Container>
                    <AddIncomeModal ref={this.income} addNewTransaction={this.addNewTransaction.bind(this)} categories={this.state.incomeCategory}></AddIncomeModal>
                    <AddExpenseModal ref={this.expense} addNewTransaction={this.addNewTransaction.bind(this)} categories={this.state.expensesCategory}></AddExpenseModal>
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
                                data={this.state.incomeCategory.concat(this.state.expensesCategory)}
                                valueField='ID'
                                textField='name'
                                defaultValue={this.state.incomeCategory.concat(this.state.expensesCategory)}
                                onChange={this.changeCategory}
                                placeholder="Select categories"
                                showPlaceholderWithValues={false}
                            />
                        </Col>
                        <Col className="sort-filter" sm={12} md={4}>
                            <DropdownList
                                data={this.state.sortArrayValues}
                                valueField="ID"
                                textField="name"
                                defaultValue={this.state.sortArrayValues[0].name}
                                onChange={this.selectSortBy}
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
