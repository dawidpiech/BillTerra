import React, { Component } from 'react'




export class DraggableContent extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    deleteItem(id) {
        this.props.deleteItem(id);
    }

    render() {
        return (
            <div>
                {"ID: " + this.props.id}
                <br></br>
                {"Position: " + this.props.position}
                <button onClick={() => this.deleteItem(this.props.id)}>USUN</button>
            </div>
        )
    }
}