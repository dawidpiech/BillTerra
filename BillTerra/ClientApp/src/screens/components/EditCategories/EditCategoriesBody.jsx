import React, { Component } from 'react'
import "./EditCategoriesBody.scss"
import { Container, Row, Col, Button, Input } from 'reactstrap'
import { DropdownList } from 'react-widgets'
import { Category } from './Category'

const categoryType = [
    { id: 0, name: "INCOME" },
    { id: 1, name: "EXPENSE" }
]

export class EditCategoriesBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            incomeCategories: [],
            expenseCategories: [],
            selectedCategoryType: categoryType[0],
            categoryName: "",
            spinnerLoading: false,
            editCategoryResponce: ""
        }
        this.changeCategory = this.changeCategory.bind(this)
        this.deleteCategory = this.deleteCategory.bind(this)
        this.addNewCategory = this.addNewCategory.bind(this)
        this.submitChanges = this.submitChanges.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        let categories = nextProps.categories
        let incomeCategories = []
        let expenseCategories = []
        categories.forEach(element => {
            let a = {
                id: element.id,
                name: element.name
            }

            if (element.isExpense) {
                expenseCategories.push(a)
            }
            else {
                incomeCategories.push(a)
            }
        })

        this.setState({
            incomeCategories: incomeCategories,
            expenseCategories: expenseCategories
        })
    }

    deleteCategory(id, type) {
        let index
        let arr

        if (type) {
            index = this.state.incomeCategories.findIndex(e => e.id === id)
            arr = this.state.incomeCategories
        }
        else {
            index = this.state.expenseCategories.findIndex(e => e.id === id)
            arr = this.state.expenseCategories
        }

        let category = {
            ID: arr[index].id,
            Name: arr[index].name,
            IsExpense: !arr[index].id
        }

        fetch('/Categorie/DeleteCategorie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        }).then(result => {
            return result.json()
        }).then(e => {
            if (type) {
                arr.splice(index, 1)

                this.setState({
                    incomeCategories: arr
                })
            }
            else {
                arr.splice(index, 1)

                this.setState({
                    expenseCategories: arr
                })
            }
        })
    }


    changeCategory(id, name, type) {
        if (type) {
            let index = this.state.incomeCategories.findIndex(e => e.id === id)
            let arr = this.state.incomeCategories
            arr[index].name = name

            this.setState({
                incomeCategories: arr
            })
        }
        else {
            let index = this.state.expenseCategories.findIndex(e => e.id === id)
            let arr = this.state.expenseCategories
            arr[index].name = name

            this.setState({
                expenseCategories: arr
            })
        }
    }

    submitChanges() {
        let formatedCategories = []
        this.state.incomeCategories.forEach(e => {
            let element = {
                ID: e.id,
                Name: e.name,
                IsExpense: false
            }

            formatedCategories.push(element)
        })


        this.state.expenseCategories.forEach(e => {
            let element = {
                ID: e.id,
                Name: e.name,
                IsExpense: true
            }

            formatedCategories.push(element)
        })

        this.setState({
            spinnerLoading: true,
        })

        fetch('/Categorie/EditCategory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formatedCategories)
        }).then(result => {
            return result.json()
        }).then(e => {
            this.setState({
                spinnerLoading: true,
                editCategoryResponce: e
            })
        })
    }

    addNewCategory() {
        let arr
        let newCategory
        if (this.state.selectedCategoryType.id === 0) {
            arr = this.state.incomeCategories

            newCategory = {
                ID: 0,
                Name: this.state.categoryName,
                IsExpense: (this.state.selectedCategoryType.id === 0) ? false : true
            }
        }
        else {
            arr = this.state.expenseCategories

            newCategory = {
                ID: 0,
                Name: this.state.categoryName,
                IsExpense: (this.state.selectedCategoryType.id === 0) ? false : true
            }
        }

        fetch('/Categorie/AddCategorie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCategory)
        }).then(result => {
            return result.json()
        }).then(e => {
            let category = {
                id: e.id,
                name: e.name
            }

            arr.unshift(category)

            if (newCategory.IsExpense) {
                this.setState({
                    expenseCategories: arr
                })
            }
            else {
                this.setState({
                    incomeCategories: arr
                })
            }
        })
    }


    render() {
        return (
            <div className="edit-category-body-wrapper">
                <Container>
                    <Row>
                        <Col md={12}>
                            <Input
                                className="category-name"
                                placeholder="Enter category name"
                                onChange={e =>
                                    this.setState({
                                        categoryName: e.target.value
                                    })
                                }
                                invalid={(this.state.categoryName.length > 0) ? false : true}
                            >

                            </Input>
                        </Col>
                        <Col md={8}>
                            <DropdownList
                                className="categoryType"
                                data={categoryType}
                                onChange={value => this.setState({ selectedCategoryType: value })}
                                textField="name"
                                valueField="id"
                                placeholder="Select INCOME/EXPENSE"
                                value={this.state.selectedCategoryType}
                            />
                        </Col>
                        <Col md={4}>
                            <Button className="add-new-category-button" onClick={this.addNewCategory}>ADD NEW CATEGORY</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6} md={12}>
                            <h2>
                                Incomes CATEGORIES
                            </h2>
                            {this.state.incomeCategories.map(d =>
                                <Category id={d.id} name={d.name} type={true} changeCategory={this.changeCategory} deleteCategory={this.deleteCategory}></Category>
                            )}
                        </Col>
                        <Col xl={6} md={12}>
                            <h2>
                                Expenses CATEGORIES
                            </h2>
                            {this.state.expenseCategories.map(d =>
                                <Category id={d.id} name={d.name} type={false} changeCategory={this.changeCategory} deleteCategory={this.deleteCategory}></Category>
                            )}
                        </Col>
                        <Col xl={12} md={12}>
                            <Button className="edit-categories-submit" onClick={this.submitChanges}>
                                Save ALL changes in CATEGORIES
                                <br></br>
                                {(this.state.spinnerLoading) ?
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    : ""
                                }
                                <span className="edit-categories-responce">{this.state.editCategoryResponce}</span>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}