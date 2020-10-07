import React, { Component } from 'react'
import "./ShoppingListBody.scss"
import { Container, Row, Col, Button, Input, Form } from 'reactstrap'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { DraggableContent } from "./DraggableContent"


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 8 * 2,
    margin: `0 0 ${8}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
})


const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
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
            deletedElements: [
                { content: "item 1", id: "item-1" },
                { content: "item 2", id: "item-2" },
                { content: "item 3", id: "item-3" },
                { content: "item 4", id: "item-4" }
            ],
            visibleDeletedElements: [

            ],
            items: [
                { content: "item 1", id: "item-1" },
                { content: "item 2", id: "item-2" },
                { content: "item 3", id: "item-3" },
                { content: "item 4", id: "item-4" },
                { content: "item 5", id: "item-5" },
                { content: "item 6", id: "item-6" },
                { content: "item 7", id: "item-7" },
                { content: "item 8", id: "item-8" },
                { content: "item 9", id: "item-9" }
            ]
        }

        this.onDragEnd = this.onDragEnd.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    componentWillUnmount() {
        console.log("KONIEC")  //tutaj masz dopisać funkcję która wysyła aktualizację listy do bazy danych
    }


    onDragEnd(result) {
        if (!result.destination) {
            return
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        })
    }

    deleteItem(id) {
        let arr = this.state.items
        let idInArray
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                idInArray = i
            }
        }

        let deletedItems = this.state.deletedElements
        let deletedItem = arr[idInArray]
        arr.splice(idInArray, 1)
        deletedItems.unshift(deletedItem)
        this.setState({
            deletedElements: deletedItems,
            items: arr
        })
    }

    addNewItem(e) {
        e.preventDefault()
        let value = document.forms["addNewListElement"]["itemValue"].value
        console.log(value)
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
                                        <Input type="submit" value="ADD"></Input>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="shopping-list-elements">
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                        >
                                            {this.state.items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                                            <DraggableContent position={index} id={item.id} deleteItem={this.deleteItem}>

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

                            <div className="shopping-list-deleted-elements">
                                {this.state.visibleDeletedElements.map(d =>
                                    <div>{d.content}</div>
                                )}
                            </div>
                            <Button>Show completed elements</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}