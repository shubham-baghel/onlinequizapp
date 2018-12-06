import React , {Component} from 'react' 
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Home'
import QuizContainer from './Quiz/QuizContainer'
import QuestionFormContainer from './Forms/QuestionFormContainer';
import RevisitForm from './Quiz/RevisitForm';
import QuizLaunchByVisitor from './QuizLaunch/QuizLaunchByVisiter';
import SignIn from './Account/SingIn';

class Routing extends Component {
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/quiz' component={QuizContainer} />
                    <Route path='/q/add' component={QuestionFormContainer}/>
                    <Route exact path='/quiz/review' component= {RevisitForm} />
                    <Route path='/visitorQuiz' component= {QuizLaunchByVisitor} />
                    <Redirect to="/" />             
                </Switch>
            </div>
        ) 
    }
}

export default Routing;