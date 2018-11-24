import request from '../Shared/request';

export default class QuestionService {
    constructor(){
        this.getQuestionsBySubject = this.getQuestionsBySubject.bind(this);
    }
    
    getQuestionsBySubject(subjects) {
        return request({
            url : `/api/questions/s/` + subjects,
            method: 'GET'
        });
    }

    postQuestion(questionData) {
        return request({
            url : `/api/questions` ,
            method : 'POST',
            data : questionData
        });
    }
}