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
        this.answers.filter(el => el.id === answer.questionId).map(el => el.answers = [
            {
                answer: answer.answerText,
                correct: answer.correct
            }
        ]);
    }
    updateCheckboxAnswer(answer) {
        this.answers.forEach(el => {
            if (el.id === answer.questionId) {
                if (document.getElementById(answer.inputId).checked) {
                    el.answers.push(
                        {
                            answer: answer.answerText,
                            correct: answer.correct
                        }
                    );
                }
                else {
                    const index = el.answers.findIndex(a => a.answer === answer.answer && a.correct === answer.correct);
                    el.answers.splice(index, 1);
                }
            }
        });
    }
    getAnswerById(id) {
        return this.answers.filter(el => el.id === id)[0];
    }
}

export { QuestionsAnswers };