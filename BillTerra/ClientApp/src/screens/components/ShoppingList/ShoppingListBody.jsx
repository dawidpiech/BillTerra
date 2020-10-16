import React, { Component } from 'react'
import "./ShoppingListBody.scss"
import { Container, Row, Col, Button, Input, Form } from 'reactstrap'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { DraggableContent } from "./DraggableContent"
import { DeletedItem } from './DeletedItem'


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8,
    margin: `0 0 ${8}px 0`,
    borderRadius: 25,
    boxShadow: "rgba(158, 158, 158, 0.5) 0px 7px 13px -3px",


    // change background colour if dragging
    background: isDragging ? "rgba(18, 206, 173, 0.2)" : "#ffffff",

    // styles we need to apply on draggables
    ...draggableStyle
})


const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "rgba(112, 112, 112, 0.05)" : "#ffffff",
    borderRadius: "30px",
    padding: 8,
    width: "100%"
})


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}



export class ShoppingListBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: []
        }

        this.onDragEnd = this.onDragEnd.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.addNewItem = this.addNewItem.bind(this)
    }

    componentWillUnmount() {
        let arr = []

        this.state.items.forEach((value, id) => {
            let element = {
                ID: value.id,
                Content: value.content,
                PositionInList: id
            }

            arr.push(element)
        })


        fetch('/ShoppingList/EditShopingList', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(arr)
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            items: nextProps.items
        })
    }


    onDragEnd(result) {
        if (!result.destination) {
            return
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        )

        this.setState({
            items: items
        })
    }

    deleteItem(id, position) {
        let arr = this.state.items
        let idInArray
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                idInArray = i
            }
        }

        let newElementToServer = {
            ID: arr[idInArray].id,
            Content: arr[idInArray].content,
            PositionInList: position
        }

        arr.splice(idInArray, 1)


        fetch('/ShoppingList/DeleteShopingListElement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newElementToServer)
        }).then(() => {
            this.setState({
                items: arr
            })
        }).catch(error => {
            console.log(error)
        })
    }

    addNewItem(e) {
        e.preventDefault()
        let value = document.forms["addNewListElement"]["itemValue"].value
        let newElementToServer = {
            ID: 0,
            Content: value,
            PositionInList: 0
        }

        let arr = this.state.items


        fetch('/ShoppingList/AddShopingListElement', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newElementToServer)
        }).then(result => {
            return result.json()
        }).then(e => {
            let element = {
                content: e.content,
                id: e.id
            }
            arr.unshift(element)
            this.setState({
                items: arr
            })
        }).catch(error => {
            console.log(error)
        })
    }

    showDeletedElements() {
        let handler = document.querySelector(".shopping-list-deleted-elements")
        handler.classList.toggle("shopping-list-deleted-elements-hide")
    }



    render() {
        return (
            <div className="shopping-list-body-wrapper">
                <Container>
                    <Row>
                        <Col className="shopping-list-input">
                            <Form name={"addNewListElement"} onSubmit={this.addNewItem}>
                                <Row>
                                    <Col xs={12} sm={10}>
                                        <Input type="text" name="itemValue"></Input>
                                    </Col>
                                    <Col xs={12} sm={2}>
                                        <Input className="shopping-list-add-button" type="submit" value="ADD"></Input>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="shopping-list-elements">
                            {(this.state.items.length > 0) ?
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}
                                            >
                                                {this.state.items.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}
                                                            >
                                                                <DraggableContent position={index} id={item.id} content={item.content} deleteItem={this.deleteItem}>

                                                                </DraggableContent>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                                :
                                <h1>Currently list is empty.</h1>
                            }
                            {/* <Button className="shopping-list-show-deleted-elements-button" onClick={this.showDeletedElements}>SHOW COMPLETED ELEMENTS</Button>
                            <div className="shopping-list-deleted-elements shopping-list-deleted-elements-hide">
                                {this.state.deletedElements.map(d =>
                                    <DeletedItem content={d.content}></DeletedItem>
                                )}
                            </div> */}

                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}