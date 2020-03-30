class QuestionsAnswers {
    constructor(){
        this.answers = [];
    }
    addAnswer(answer){
        const index = this.answers.findIndex(a => a.id === answer.id);
        if(index !== -1){
           
            this.answers.splice(index, 1);
            this.answers.push(answer);           
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