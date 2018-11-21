import React , {Component} from 'react' 
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import QuestionContainer from './Question/QuestionContainer'
import QuestionFormContainer from './Forms/QuestionFormContainer';

class Routing extends Component {
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/quiz' component={QuestionContainer} />
                    <Route path='/q/add' component={QuestionFormContainer}/>
                </Switch>
            </main>
        )
    }
}

export default Routing;