const btnNext = document.querySelector('.btn-next');
const quizStep = document.querySelectorAll('.quiz-step');
const arrowBack = document.querySelector('.arrow-back-img');
const progressBarLine = document.querySelector('.progress-bar-line');
const progressPercentage = document.querySelector('.progress-percentage');
let index = 0;
let questionsPassed = 0;
let inputValidated = false;

if (1) {
    inputValidated = true;
}

const questionSwitch = () => {
    quizStep.item(index).classList.remove('active');
    quizStep.item(index+1).classList.add('active');
    arrowBack.style.opacity = '1';
    index++;
    questionsPassed+1;
    console.log(quizStep[index]);
    progressBarLine.style.width = 100 / quizStep.length * quizStep.item(index) + '%';
    // progressPercentage.innerText = Math.ceil(100 / quizStep.length) + '%';
}

const questionBack = () => {
    quizStep.item(index).classList.remove('active');
    quizStep.item(index-1).classList.add('active');
    index--;
    progressBarLine.style.width = 100 / quizStep.length + '%';
    progressPercentage.innerText = Math.ceil(100 / quizStep.length) + '%';
}

btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    questionSwitch();
})

arrowBack.addEventListener('click', (e) => {
    e.preventDefault();
    questionBack();
})