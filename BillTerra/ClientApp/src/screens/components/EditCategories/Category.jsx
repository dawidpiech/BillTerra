import React, { Component } from 'react'
import "./Category.scss"
import { Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


export class Category extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }

    }


    changeCategory(id, name, type) {
        this.props.changeCategory(id, name, type)
    }


    render() {
        return (
            <div className="category">
                <Input
                    value={this.props.name}
                    onChange={e => {
                        this.changeCategory(this.props.id, e.target.value, this.props.type)
                    }}
                >
                </Input>
                <FontAwesomeIcon icon={faTrashAlt} className="category-delete-button" onClick={() => this.props.deleteCategory(this.props.id, this.props.type)} />
            </div>

        )
    }
}