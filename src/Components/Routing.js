import React , {Component} from 'react' 
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import QuizContainer from './Quiz/QuizContainer'
import QuestionFormContainer from './Forms/QuestionFormContainer';
import RevisitForm from './Quiz/RevisitForm';
import QuizLaunchByVisitor from './QuizLaunch/QuizLaunchByVisiter';

class Routing extends Component {
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/quiz' component={QuizContainer} />
                    <Route path='/q/add' component={QuestionFormContainer}/>
                    <Route exact path='/quiz/review' component= {RevisitForm} />
                    <Route path='/preparequiz-visitor' component= {QuizLaunchByVisitor} />
                </Switch>
            </main>
        )
    }
}

export default Routing;