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
        return this.allTests;
    }
    deleteTest(test) {
        this.allTests = this.allTests.filter((el) => {
            if (test !== el.id) {
                return el;
            }
        });
        localStorage.setItem('allTests', JSON.stringify(this.allTests));
    }
    updateTest(test) {
        this.allTests.forEach((el) => {
            if (test.id === el.id) {
                el.name = test.name;
                el.category = test.category;
                el.questions = test.questions;
            }
        });
        localStorage.setItem('allTests', JSON.stringify(this.allTests));
    }

    getTestById(testId) {               
       return  this.allTests.filter(el => el.id == testId).map(e => Object.assign(new Test, e))[0];
    }
}
export { TestStorage, Test };