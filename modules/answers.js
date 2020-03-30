class QuestionsAnswers {
    constructor() {
        this.answers = [];
    }
    addAnswer(answer) {
        this.answers.push(answer);
    }
    updateRadioAnswer(answer) {
        return this.answers.filter(el => el.id === answer.id).map(el => el.answer = answer.answer)[0];
    }
    updateCheckBoxAnswer(answer) {
        return this.answers.filter(el => el.id === answer.id).map(el => el.answer.push(answer));
    }
    getAnswerById(id) {
        return this.answers.filter(el => el.id === id)[0];
    }
}

export { QuestionsAnswers };