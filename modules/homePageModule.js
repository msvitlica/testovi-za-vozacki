import { onPageLoad, clickStartButton } from '../homePage.js';

const body = document.getElementById('body');
const startBtn = document.getElementById('start');

startBtn.addEventListener('click', clickStartButton);
body.addEventListener('load', onPageLoad());