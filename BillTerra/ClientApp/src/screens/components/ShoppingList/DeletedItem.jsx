import React, { Component } from 'react'
import "./DeletedItem.scss"


export class DeletedItem extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="deleted-item">
                <div className="deleted-item-content">
                    {this.props.content}
                </div>
            </div>
        )
    }

}