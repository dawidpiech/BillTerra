import React, { Component } from 'react';
import "./ShoppingListBody.scss"
import { Container, Row, Col, Button, Input, Form } from 'reactstrap'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
})

const grid = 8

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: "100%"
})


const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }))


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
            elements: ["asdfsadf", "asfdasdfas"],
            items: getItems(10)
        }

        this.onDragEnd = this.onDragEnd.bind(this);
    }


    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    }



    render() {
        return (
            <div className="shopping-list-body-wrapper">
                <Container>
                    <Row>
                        <Col className="shopping-list-input">
                            <Form>
                                <Row>
                                    <Col xs={12} sm={10}>
                                        <Input type="text"></Input>
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
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>



                            <div className="shopping-list">
                                {this.state.elements.map(d =>
                                    <div>{d}</div>
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


window.React2 = require('react')
console.log(window.React1 === window.React2)
console.log(window.React1)
console.log(window.React2)
console.log("Asdfsadfasd")