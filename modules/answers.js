class QuestionsAnswers {
    constructor(){
        this.answers = [];
    }
    addAnswer(answer){
        this.answers.push(answer);
        localStorage.setItem('questionAnswers', JSON.stringify(this.answers));
    }
    updateAnswer(answer){

    }
}

export { QuestionsAnswers };