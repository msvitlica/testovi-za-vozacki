let selectedTest = undefined;

function onPageLoad() {
    [...document.getElementsByClassName("button")].forEach(button => 
        {
        button.addEventListener('click', (event) => 
        {
            [...document.getElementsByClassName("button")].forEach(button => button.classList.remove("selected_button"));
            button.classList.add("selected_button");
            selectedTest = button.innerHTML;            
        })
    });
}

function onStart(){
    alert(selectedTest);
}

// Class for manipulating with questions

class Question{
    constructor(questionText, category, img){
        this.questionText = questionText;
        this.answers = [];
        this.category = category;
        this.img = img;
    }
    addAnswers(answer){
        this.answers = [...answer];
    }
}