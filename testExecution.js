import { TestStorage } from './modules/tests.js';

let body = document.getElementById('body');

body.addEventListener('load', onLoad());

function onLoad() {
    let testStorage = new TestStorage();
    testStorage.getAllTests();
    let urlParameters = new URLSearchParams(window.location.search);
    let parameter = urlParameters.get('parameter');
    let test = testStorage.getTestById(parameter);
    
    let content = document.getElementById('content');

    test.questions.forEach( (element, index) => {
        content.innerHTML += '<div class="questions" id="question' + index +'"><p>' + element.questionText + '</p></div>';        
    });
}