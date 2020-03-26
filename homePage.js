import { TestStorage, Test } from "./modules/tests.js";

let testStorage;
var selectedTestButton;
function onPageLoad() {
    testStorage = new TestStorage();
    testStorage.getAllTests().filter(el => el.category === 'Kategorija B').forEach(el => {
        document.getElementById('testHolder1').innerHTML += '<button class= "button" id="' + el.id +'">' + el.name + '</button>'
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
                selectedTestButton = button.id;
        })
    });
}
function clickStartButton() {
    //window.document.location = "testExecution.html?parameter=" + selectedTestButton;
    window.location = "./testExecution.html?parameter=" + selectedTestButton;
}

const body = document.getElementById('body');
const startBtn = document.getElementById('start');

startBtn.addEventListener('click', clickStartButton);
window.addEventListener('load', onPageLoad);