var selectedTestButton= undefined;
function onPageLoad() {
     testStorage= new TestStorage();
    testStorage.getAllTests().filter(el => el.category === 'Kategorija B').forEach(el => {
        document.getElementById('testHolder1').innerHTML += '<button class= "button">' + el.name + '</button>'
    });
    testStorage.getAllTests().filter(el => el.category === 'Kategorija C').forEach(el => {
        document.getElementById('testHolder2').innerHTML += '<button class= "button">' + el.name + '</button>'
    });
    testStorage.getAllTests().filter(el => el.category === 'Kategorija D').forEach(el => {
        document.getElementById('testHolder3').innerHTML += '<button class= "button">' + el.name + '</button>'
    });
   [...document.getElementsByClassName("button")].forEach(button => {
        button.addEventListener('click', () => {
            [...document.getElementsByClassName("button")].forEach(button =>
                button.classList.remove("selected_button")),
                button.classList.add("selected_button"),
                selectedTestButton= button.innerHTML;
        })
    });
}

// Class for manipulating witsthis.allQuestions

class Question {
    constructor() {
        this.questionText;
        this.answers = [];
        this.category;
        this.img;
        this.id;
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

class Test {
    constructor() {
        this.id;
        this.name;
        this.category;
        this.questions = [];
        this.correct = 0;
        this.false = 0;
    }
    addQuestion(question) {
        this.questions.push(question);
    }
    deleteQuestion(question) {
        this.questions = this.questions.filter((el) => {
            if (question !== el.id) {
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
            }
        });
        localStorage.setItem('allQuestions', JSON.stringify(this.allQuestions));
    }
    delete(id) {
        this.allQuestions = this.allQuestions.filter((el) => el.id !== id);
        localStorage.setItem('allQuestions', JSON.stringify(this.allQuestions));
    }
}

class TestStorage {
    constructor() {
        this.allTests = [];
    }
    saveTest(test) {
        test.id = uuidv1()
        this.allTests.push(test);
        localStorage.setItem('allTests', JSON.stringify(this.allTests));
    }
    getAllTests() {
        let loadTests = localStorage.getItem('allTests');
        if (loadTests) {
            this.allTests = JSON.parse(loadTests);
        }
        return this.allTests
    }
    deleteTest(test) {
        this.allTests = this.allTests.filter((el) => {
            if (test !== el.id) {
                return el;
            }
        });
        localStorage.setItem('allTests', JSON.stringify(this.allTests));
    }
    updateTest(test){
        this.allTests.forEach((el)=> {
            if(test.id=== el.id){
              el.name= test.name;
              el.category= test.category ;
            }
        });
        localStorage.setItem('allTests', JSON.stringify(this.allTests));
    }
}
