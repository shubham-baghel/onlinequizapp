import React , {Component} from 'react' 
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import QuestionContainer from './Question/QuestionContainer'

class Routing extends Component {
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/quiz' component={QuestionContainer} />
                </Switch>
            </main>
        )
    }
}

export default Routing;