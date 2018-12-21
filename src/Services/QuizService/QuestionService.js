import request from '../Shared/request';

export default class QuestionService {
    constructor(loggedInUser){
        this.getQuestionsBySubject = this.getQuestionsBySubject.bind(this);
        this.postQuestion=this.postQuestion.bind(this);
        this.getQuizByUser=this.getQuizByUser.bind(this);
        this.postQuiz=this.postQuiz.bind(this);
        this.loggedInUser=loggedInUser;
    }
    
    getQuestionsBySubject(subjects) {
        return request({
            url : `/api/questions/s/` + subjects,
            method: 'GET'
        });
    }

    getQuestionsByUser(userId) {
        userId=userId||this.loggedInUser;
        return request({
            url : `/api/questions/u/` + userId,
            method: 'GET'
        });
    }

    postQuestion(questionData) {
        questionData.createdBy=this.loggedInUser;
        console.log(questionData);
        return request({
            url : `/api/questions` ,
            method : 'POST',
            data : questionData
        });
    }

    getQuizByUser(userId) {
        userId=userId||this.loggedInUser;
        return request({
            url : `/api/quizes/u/` + userId,
            method: 'GET'
        });
    }

    saveQuizMapping(mappingData) {
        mappingData.createdBy=this.loggedInUser;
        mappingData.modifiedBy=this.loggedInUser;
        return request({
            url : `/api/quizes/map`,
            method: 'POST',
            data : mappingData
        });
    }

    postQuiz(quizData) {
        quizData.createdBy=this.loggedInUser;
        return request({
            url : `/api/quizes` ,
            method : 'POST',
            data : quizData
        });
    }

    deleteQuizs(quiz_ids) {
        var user=this.loggedInUser;
        return request({
            url : `/api/quizes/delete` ,
            method : 'POST',
            data : {quiz_ids:quiz_ids,modifiedBy:user}
        });
    }

    getQuizCompleteDetail(quiz_id) {
      
        return request({
            url : `/api/quizes/detail/`+quiz_id,
            method : 'GET'
        });
    }
}