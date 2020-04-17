class QuestionsAnswers {
    constructor() {
        this.answers = [];
    }
    addAnswer(answer) {
        const index = this.answers.findIndex(a => a.id === answer.id);
        if (index !== -1) {

            this.answers.splice(index, 1);
            this.answers.push(answer);
        }
        else {
            this.answers.push(answer);
        }
    }
    updateRadioAnswer(answer) {
        this.answers.forEach(el => {
            if (el.id === answer.questionId) {
                el.answerDivId = answer.answerDivId;
                el.chosenAnswers = [
                    {
                        answer: answer.answerText
                    }];
            }
        });
    }
    updateCheckboxAnswer(answer) {
        this.answers.forEach(el => {
            if (el.id === answer.questionId) {
                if (document.getElementById(answer.inputId).checked) {
                    el.answerDivId = answer.answerDivId;
                    el.chosenAnswers.push(
                        {
                            answer: answer.answerText
                        }
                    );
                }
                else {
                    const index = el.chosenAnswers.findIndex(a => a.answer === answer.answerText);
                    el.chosenAnswers.splice(index, 1);
                }
            }
        })
    }
    getAnswerById(id) {
        return this.answers.filter(el => el.id === id)[0];
    }
}

export { QuestionsAnswers };