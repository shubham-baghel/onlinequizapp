import React,{Component} from 'react'
import Option from './Option'

class Options extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let responses=this.props.responses;
        return(
            <ul className="list-group">
            {
                this.props.options.map((element,i) => {
                    var responded= responses.includes(element.id);
                    return(<Option clicked={responded} key={i} option = {element} onOptionSelect = {this.props.onOptionSelect}/>)
                })
            }
            </ul>
        )
    }

}

export default Options;