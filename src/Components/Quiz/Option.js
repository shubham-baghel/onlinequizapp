import React, { Component } from 'react'

class Option extends Component {
    constructor(props){
        super(props);
        this.changeOptionComp = this.changeOptionComp.bind(this);
    }

    changeOptionComp(e) {
        this.props.onOptionSelect(e);
    }

    render() {
        var className = this.props.clicked ? "list-group-item btn mt-2 active" : "list-group-item btn mt-2"
        return (
            <li className= {className}
                id={this.props.option.id}
                onClick={this.changeOptionComp}>
                {this.props.option.o}
            </li>
        )
    }
}

export default Option;