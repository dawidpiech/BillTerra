import React, { Component } from 'react';
import "./Loader.scss"


export class Loader extends Component {

    constructor(props) {
        super(props)
        this.state = {
        };
    }



    componentDidMount() {
        this.props.onRef(this)
        this.loaderHandle = document.querySelector('.loader-wrapper')
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    hideLoader = () => {
        setTimeout(() => {
            this.loaderHandle.classList.add("loader-hide")
        }, 500);

    }


    render() {
        return (
            <div className="loader-wrapper">
                <div className="loader">Loading...</div>
            </div>
        )
    }
}