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
                el.chosenAnswers = [
                    {
                        answerText: answer.answerText
                    }];
            }
        });
    }
    updateCheckboxAnswer(answer) {
        this.answers.forEach(el => {
            if (el.id === answer.questionId) {
                if (!document.getElementById(answer.inputId).checked) {
                    const index = el.chosenAnswers.findIndex(a => a.answer === answer.answer);
                    el.chosenAnswers.splice(index, 1);
                }
                else {
                    el.chosenAnswers.push(
                        {
                            answer: answer.answerText
                        }
                    );
                }
            }
        })
    }
    getAnswerById(id) {
        return this.answers.filter(el => el.id === id)[0];
    }
}

export { QuestionsAnswers };