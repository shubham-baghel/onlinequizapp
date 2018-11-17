import React,{Component} from 'react'
import Option from './Option'

class Options extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="card-body">
                <ul className="list-group">
                {
                    this.props.options.map((element,i) => {
                        return(<Option key={i} option = {element}/>)
                    })
                }
                </ul>
            </div>
        )
    }

}

export default Options;