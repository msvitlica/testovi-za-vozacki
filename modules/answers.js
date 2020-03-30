class QuestionsAnswers {
    constructor(){
        this.answers = [];
    }
    addAnswer(answer){
        let existingAnswer = this.answers.find(a => a.id === answer.id)
        if(existingAnswer){
            existingAnswer = answer;
        }
        else
        {
           this.answers.push(answer);
        }       
    }
    updateAnswer(answer){

    }
}

export { QuestionsAnswers };