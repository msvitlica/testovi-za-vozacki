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

// Class for manipulating witsthis.allQuestions

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

class Questionair{
    constructor(){
        this.questions = [];
    }
}

class QuestionsStorage{
    constructor(){
        this.allQuestions = [];
    }
    saveQuestion(question){
        question.id = uuidv1();
        this.allQuestions.push(question);
        localStorage.setItem('allQuestions', JSON.stringify(this.allQuestions));
    }
    getAllQuestions(){
        let loadData = localStorage.getItem('allQuestions');
        loadData ? this.allQuestions = JSON.parse(loadData) : this.allQuestions = [];
        return this.allQuestions;
    }
}
function loadData(){
    questions = new QuestionsStorage();
    drawTable(document.getElementById('questionTable'));
}