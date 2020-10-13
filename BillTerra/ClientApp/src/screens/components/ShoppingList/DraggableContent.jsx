import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import "./DraggableContent.scss"


export class DraggableContent extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    deleteItem(id, position) {
        this.props.deleteItem(id, position)
    }

    render() {
        return (
            <div className="draggable-content">
                <div className="shopping-list-content">
                    {this.props.content}
                    {/* <br></br>
                    {"ID: " + this.props.id}
                    <br></br>
                    {"Position: " + this.props.position} */}
                </div>
                <div className="shopping-list-delete">
                    <FontAwesomeIcon icon={faTrashAlt} className="shopping-list-delete-button" onClick={() => this.deleteItem(this.props.id, this.props.position)} />
                </div>
            </div>
        )
    }
}