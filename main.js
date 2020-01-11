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