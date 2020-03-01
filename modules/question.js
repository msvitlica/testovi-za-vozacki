class Question {
    constructor() {
        this.questionText;
        this.answers = [];
        this.category;
        this.img;
        this.id;
        this.point;
    }
    addAnswers(answer) {
        this.answers.push(answer);
    }
    deleteAnswer(answer) {
        this.answers = this.answers.filter((el) => {
            if (answer !== el.answer) {
                return el;
            }
        })
    }
}

class QuestionsStorage {
    constructor() {
        this.allQuestions = [];
    }
    saveQuestion(question) {
        question.id = uuidv1();
        this.allQuestions.push(question);
        localStorage.setItem('allQuestions', JSON.stringify(this.allQuestions));
    }
    getQuestionById(questionId) {
        return  this.allQuestions.filter(el => el.id == questionId).map(e => Object.assign(new Question, e))[0];
    }
    getAllQuestions() {
        let loadData = localStorage.getItem('allQuestions');
        if (loadData) {
            this.allQuestions = JSON.parse(loadData);
        }
        return this.allQuestions;
    }
    updateQuestion(question) {
        this.allQuestions.forEach((el) => {
            if (question.id === el.id) {
                el.questionText = question.questionText;
                el.category = question.category;
                el.img = question.img;
                el.answers = question.answers;
                el.point= question.point;
            }
        });
        localStorage.setItem('allQuestions', JSON.stringify(this.allQuestions));
    }
    delete(id) {
        this.allQuestions = this.allQuestions.filter((el) => el.id !== id);
        localStorage.setItem('allQuestions', JSON.stringify(this.allQuestions));
    }
}
export { Question, QuestionsStorage };