import React, {Component} from 'react'

class Option extends Component {
    render() {
        return(
        <li className="list-group-item">{this.props.option}</li>
        )
    }
}

 export  default Option;