var selectedTestButton = undefined;
function onPageLoad() {
    testButtons.filter(el=> el.category=== 'B').forEach(el => {
        document.getElementById('testHolder1').innerHTML += '<button class= "button">' + el.name + '</button>'
    });
    testButtons.filter(el=> el.category=== 'C').forEach(el => {
        document.getElementById('testHolder2').innerHTML += '<button class= "button">' + el.name + '</button>'
    });
    testButtons.filter(el=> el.category=== 'D').forEach(el => {
        document.getElementById('testHolder3').innerHTML += '<button class= "button">' + el.name + '</button>'
    });
    [...document.getElementsByClassName("button")].forEach(button => {
        button.addEventListener('click', () => {
            [...document.getElementsByClassName("button")].forEach(button =>
                button.classList.remove("selected_button")),
                button.classList.add("selected_button"),
                selectedTestButton = button.innerHTML;
        })
    });
}

// Class for manipulating with questions

class Question{
    constructor(){
        this.questionText;
        this.answers = [];
        this.category;
        this.img;
        this.id;
    }
    addAnswers(answer){
        this.answers.push(answer);
    }
    deleteAnswer(answer){
        this.answers = this.answers.filter((el) => {
            if(answer !== el.answer){
                return el;
            }
        })
    }
}

class QuestionsStorage{
    constructor(){
        this.questions = [];
    }
    saveQuestion(question){
        question.id = uuidv1();
        this.questions.push(question);
        localStorage.setItem('questions', JSON.stringify(this.questions));
    }
    getAllQuestions(){
        let loadData = localStorage.getItem('questions');
        loadData ? this.questions = JSON.parse(loadData) : this.questions = [];
        return this.questions;
    }
}
function loadData(){
    questions = new QuestionsStorage();
    drawTable(document.getElementById('questionTable'));
}