import React, { Component } from 'react'
import './FinanceBlock.scss'

export class FinanceBlock extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className="finance-block" style={{ backgroundColor: this.props.backgroundColor, color: this.props.fontColor }}>
                <p>
                    {this.props.name}
                </p>
                <p>
                    {this.props.value} PLN
                </p>
            </div>
        )
    }
}
