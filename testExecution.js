let body = document.getElementById('body');

body.addEventListener('load', onLoad);

function onLoad() {
    let testId = new URLSearchParams(window.location.search);
    let parameter = testId.get('parameter');
    console.log(parameter);
}