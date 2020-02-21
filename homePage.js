import { TestStorage, Test } from "./modules/tests.js";

let testStorage;
var selectedTestButton;
function onPageLoad() {
    testStorage = new TestStorage();
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
                selectedTestButton = button.innerHTML;
        })
    });
}
function clickStartButton() {
    alert(selectedTestButton);

}

export { onPageLoad, clickStartButton };