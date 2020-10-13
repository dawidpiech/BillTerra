import React, { Component } from 'react'
import "./Jar.scss"
import ProgressBar from './ProgressBar'




export class Jar extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }

        this.deleteJar = this.deleteJar.bind(this)
        this.reachGoal = this.reachGoal.bind(this)
    }

    deleteJar() {
        this.props.deleteJar(this.props.id)
    }

    reachGoal() {
        this.props.reachTheGoal(this.props.id)
    }

    render() {
        let progressBar = Math.round(parseFloat(this.props.currentAmount) / parseFloat(this.props.goal) * 100)

        return (
            <div className="jar-wrapper">
                <div className="jar-desc">
                    <div className="jar-name">
                        {this.props.name}
                    </div>
                    <div className="jar-goal">
                        {this.props.currentAmount + "/" + this.props.goal}
                    </div>
                </div>
                <div className="jar-progress">
                    <ProgressBar bgcolor={"#12CEAD"} completed={progressBar} />
                </div>
                <div className="jar-buttons">
                    <button onClick={this.deleteJar}>
                        Delete JAR
                    </button>
                    {this.props.state === "achived" ? <button onClick={this.reachGoal}>Reach the GOAL</button> : ""}
                </div>

            </div>
        )
    }


}